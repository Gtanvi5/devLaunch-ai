import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const PLAN_CONFIG: Record<string, { name: string; features: string[] }> = {
  plan_StarterId123: {
    name: "Starter Plan",
    features: ["1 team member", "1,000 API requests/mo", "Community support"],
  },
  plan_ProId456: {
    name: "Pro Plan",
    features: [
      "Up to 5 team members",
      "10,000 API requests/mo",
      "Priority email support",
    ],
  },
};

const DEFAULT_PLAN_CONFIG = {
  name: "Custom Plan",
  features: ["Standard features"],
};

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ ERROR: Razorpay environment variables are missing.");
      return NextResponse.json(
        { error: "Payment gateway configuration error." },
        { status: 500 },
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { razorpayCustomerId: true },
    });

    const customerId = dbUser?.razorpayCustomerId;

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
        count: 10,
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
    let mappedPlan = DEFAULT_PLAN_CONFIG;

    if (activeSub?.plan_id) {
      planDetails = await razorpay.plans.fetch(activeSub.plan_id);
      mappedPlan = PLAN_CONFIG[activeSub.plan_id] || DEFAULT_PLAN_CONFIG;
    }

    return NextResponse.json({
      hasSubscription: !!activeSub,
      subscription: activeSub
        ? {
            id: activeSub.id,
            status: activeSub.status,
            amount: planDetails?.item?.amount
              ? (planDetails.item.amount as number) / 100
              : 0,
            planName: planDetails?.item?.name || mappedPlan.name,
            currentPeriodEnd: activeSub.current_end
              ? activeSub.current_end * 1000
              : null,
            features: mappedPlan.features,
          }
        : null,
      paymentMethod: null,
      invoices: invoices.items.map((inv) => ({
        id: inv.receipt || inv.id,
        date: inv.issued_at ? inv.issued_at * 1000 : inv.created_at * 1000,
        amount: ((inv.amount as number) ?? 0) / 100,
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
