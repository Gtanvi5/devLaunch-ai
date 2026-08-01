import { NextResponse } from "next/server";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const customerId = user?.publicMetadata?.razorpay_customer_id as string;

    if (!customerId) {
      return NextResponse.json(
        { error: "No Razorpay customer found." },
        { status: 404 },
      );
    }

    const subscriptions = await razorpay.subscriptions.all({
      customer_id: customerId,
      count: 10,
    } as Record<string, unknown>);

    const activeSub = subscriptions.items.find(
      (sub) => sub.status === "active" || sub.status === "authenticated",
    );

    if (!activeSub) {
      return NextResponse.json(
        { error: "No active subscription found to cancel." },
        { status: 404 },
      );
    }

    await razorpay.subscriptions.cancel(activeSub.id, false);

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        subscription_status: "inactive",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
