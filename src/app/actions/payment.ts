"use server";

import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";

export async function createOrder() {
  // 1. Authenticate the user
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 2. Explicit sanity check to print clear errors if keys are physically missing
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error(
      "❌ ERROR: Razorpay environment variables are completely missing!",
    );
    throw new Error("Payment gateway configuration error.");
  }

  // 3. Initialize Razorpay INSIDE the function to guarantee process.env is ready
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: 100000, // Amount in paise (e.g., 1000 INR = 100000 paise)
    currency: "INR",
    receipt: `receipt_${userId}`,
    notes: {
      userId: userId, // Tied to our webhook fulfiller
    },
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Razorpay Order Creation Failed:", error);
    throw new Error("Failed to create checkout order.");
  }
}
