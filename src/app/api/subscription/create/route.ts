import { NextResponse } from "next/server";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    let body: { planId?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { planId } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required." },
        { status: 400 },
      );
    }

    const { userId, orgId, has } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!orgId) {
      return NextResponse.json(
        { error: "A workspace is required to upgrade to Pro." },
        { status: 400 },
      );
    }

    if (!has({ role: "org:admin" })) {
      return NextResponse.json(
        { error: "Only Workspace Admins can manage billing." },
        { status: 403 },
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const client = await clerkClient();

    const organization = await client.organizations.getOrganization({
      organizationId: orgId,
    });

    let customerId = organization.publicMetadata
      ?.razorpay_customer_id as string;

    if (!customerId) {
      const email = user.emailAddresses[0]?.emailAddress;
      const name = organization.name;

      const customer = await razorpay.customers.create({
        name: name,
        email: email,
      });

      customerId = customer.id;

      await client.organizations.updateOrganizationMetadata(orgId, {
        publicMetadata: {
          razorpay_customer_id: customerId,
        },
      });
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 120,
      customer_notify: 1,
      notes: {
        userId: userId,
        orgId: orgId,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      customerId: customerId,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 },
    );
  }
}
