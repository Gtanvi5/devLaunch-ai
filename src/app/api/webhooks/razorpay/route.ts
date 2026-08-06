import { headers } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

interface RazorpayEntity {
  id: string;
  amount: number;
  currency: string;
  notes?: Record<string, string>;
  customer_id?: string;
  status?: string;
}

interface RazorpayEvent {
  event: string;
  payload: {
    order?: { entity: RazorpayEntity };
    payment?: { entity: RazorpayEntity };
    subscription?: { entity: RazorpayEntity };
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return new Response("Missing signature or secret", { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature);
    const signatureBuffer = Buffer.from(signature);

    if (
      expectedBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
    ) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event: RazorpayEvent = JSON.parse(body);
    const client = await clerkClient();

    if (event.event === "order.paid") {
      const orderEntity = event.payload.order?.entity;
      const paymentEntity = event.payload.payment?.entity;

      const userId = orderEntity?.notes?.userId;
      const creditsToAdd = parseInt(orderEntity?.notes?.credits || "10", 10);

      if (userId && orderEntity) {
        const result = await prisma.$transaction(async (tx) => {
          const existingTx = await tx.transaction.findUnique({
            where: { razorpayOrderId: orderEntity.id },
          });

          if (existingTx?.status === "SUCCESS") {
            return { status: "already_processed" };
          }

          await tx.user.update({
            where: { id: userId },
            data: { credits: { increment: creditsToAdd } },
          });

          await tx.transaction.upsert({
            where: { razorpayOrderId: orderEntity.id },
            update: {
              status: "SUCCESS",
              razorpayPaymentId: paymentEntity?.id,
              razorpaySignature: signature,
            },
            create: {
              userId: userId,
              amount: orderEntity.amount,
              currency: orderEntity.currency,
              creditsAdded: creditsToAdd,
              status: "SUCCESS",
              razorpayOrderId: orderEntity.id,
              razorpayPaymentId: paymentEntity?.id,
              razorpaySignature: signature,
            },
          });

          return { status: "processed" };
        });

        if (result.status === "already_processed") {
          return new Response(JSON.stringify({ status: "already_processed" }), {
            status: 200,
          });
        }
      }
    }

    if (event.event === "subscription.charged") {
      const subEntity = event.payload.subscription?.entity;
      const paymentEntity = event.payload.payment?.entity;

      const userId = subEntity?.notes?.userId;
      const orgId = subEntity?.notes?.orgId;

      if (userId && paymentEntity?.id) {
        const result = await prisma.$transaction(async (tx) => {
          const existingPayment = await tx.transaction.findFirst({
            where: { razorpayPaymentId: paymentEntity.id },
          });

          if (existingPayment) {
            return { status: "already_processed" };
          }

          if (orgId) {
            await client.organizations.updateOrganizationMetadata(orgId, {
              publicMetadata: {
                razorpay_customer_id: subEntity?.customer_id,
                plan: "pro",
              },
            });
          } else {
            console.warn("Subscription charged but no orgId found in notes");
          }

          await tx.transaction.create({
            data: {
              userId: userId,
              amount: paymentEntity.amount || 0,
              currency: paymentEntity.currency || "INR",
              creditsAdded: 0,
              status: "SUCCESS",
              razorpayPaymentId: paymentEntity.id,
              razorpaySubscriptionId: subEntity?.id,
              razorpaySignature: signature,
            },
          });

          return { status: "processed" };
        });

        if (result.status === "already_processed") {
          return new Response(JSON.stringify({ status: "already_processed" }), {
            status: 200,
          });
        }
      }
    }

    if (
      event.event === "subscription.cancelled" ||
      event.event === "subscription.halted"
    ) {
      const subEntity = event.payload.subscription?.entity;
      const orgId = subEntity?.notes?.orgId;

      if (orgId) {
        await client.organizations.updateOrganizationMetadata(orgId, {
          publicMetadata: {
            plan: "free",
          },
        });
      }
    }

    return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook execution failed", { status: 500 });
  }
}
