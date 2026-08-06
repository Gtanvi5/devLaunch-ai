"use server";

import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const PRICING_PLANS = {
  starter: { price: 1000, credits: 100 },
  pro: { price: 4000, credits: 500 },
} as const;

export async function createOrder(planId: keyof typeof PRICING_PLANS) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error(
      "❌ ERROR: Razorpay environment variables are completely missing!",
    );
    throw new Error("Payment gateway configuration error.");
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const plan = PRICING_PLANS[planId];
  if (!plan) throw new Error("Invalid pricing plan selected.");

  const receiptId = `rcpt_${crypto.randomUUID().slice(0, 8)}_${Date.now().toString().slice(-6)}`;

  const options = {
    amount: plan.price * 100,
    currency: "INR",
    receipt: receiptId,
    notes: {
      userId: userId,
      planId: planId,
      creditsAdded: plan.credits,
    },
  };

  try {
    const order = await razorpay.orders.create(options);

    await prisma.transaction.create({
      data: {
        userId: userId,
        amount: plan.price,
        currency: "INR",
        creditsAdded: plan.credits,
        status: "PENDING",
        razorpayOrderId: order.id,
      },
    });

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (error) {
    console.error("Razorpay Order Creation Failed:", error);
    throw new Error("Failed to create checkout order.");
  }
}
