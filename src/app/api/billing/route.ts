import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const customerId = user?.publicMetadata?.razorpay_customer_id as string;

    if (!customerId) {
      return NextResponse.json({
        hasSubscription: false,
        subscription: null,
        paymentMethod: null,
        invoices: [],
      });
    }

    const [subscriptions, invoices] = await Promise.all([
      razorpay.subscriptions.all({
        count: 10, // Increase this so we don't miss the active one
        customer_id: customerId,
      } as Record<string, unknown>),
      razorpay.invoices.all({
        customer_id: customerId,
        count: 5,
      } as Record<string, unknown>),
    ]);

    const activeSub =
      subscriptions.items.find(
        (sub) => sub.status === "active" || sub.status === "authenticated",
      ) || null;

    let planDetails = null;

    if (activeSub?.plan_id) {
      planDetails = await razorpay.plans.fetch(activeSub.plan_id);
    }

    return NextResponse.json({
      hasSubscription: !!activeSub,
      subscription: activeSub
        ? {
            id: activeSub.id,
            status: activeSub.status,
            amount: planDetails?.item?.amount || 0,
            planName: planDetails?.item?.name || "Pro Plan",
            currentPeriodEnd: activeSub.current_end
              ? activeSub.current_end * 1000
              : null,
            features: [
              "Up to 5 team members",
              "10,000 API requests/mo",
              "Priority email support",
            ],
          }
        : null,
      paymentMethod: null,
      invoices: invoices.items.map((inv) => ({
        id: inv.receipt || inv.id,
        date: inv.issued_at ? inv.issued_at * 1000 : inv.created_at * 1000,
        amount: inv.amount,
        currency: inv.currency,
        status: inv.status
          ? inv.status.charAt(0).toUpperCase() + inv.status.slice(1)
          : "Unknown",
        pdfUrl: inv.short_url,
      })),
    });
  } catch (error) {
    console.error("Billing fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
