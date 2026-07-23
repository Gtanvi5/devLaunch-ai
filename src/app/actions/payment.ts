"use server";

import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function createOrder() {
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

  const AMOUNT_INR = 1000;
  const CREDITS_TO_ADD = 100;

  const options = {
    amount: AMOUNT_INR * 100,
    currency: "INR",
    receipt: `receipt_${userId}_${Date.now()}`,
    notes: {
      userId: userId,
      creditsAdded: CREDITS_TO_ADD,
    },
  };

  try {
    const order = await razorpay.orders.create(options);

    await prisma.transaction.create({
      data: {
        userId: userId,
        amount: AMOUNT_INR,
        currency: "INR",
        creditsAdded: CREDITS_TO_ADD,
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
