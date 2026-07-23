import { headers } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("x-razorpay-signature");
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

    if (expectedBuffer.length !== signatureBuffer.length) {
      return new Response("Invalid signature length", { status: 400 });
    }

    const isAuthentic = crypto.timingSafeEqual(expectedBuffer, signatureBuffer);

    if (!isAuthentic) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "order.paid") {
      const orderEntity = event.payload.order.entity;
      const paymentEntity = event.payload.payment?.entity;

      const userId = orderEntity.notes?.userId;
      const orderId = orderEntity.id;
      const paymentId = paymentEntity?.id;

      if (userId) {
        const existingTx = await prisma.transaction.findUnique({
          where: { razorpayOrderId: orderId },
        });

        if (existingTx?.status === "SUCCESS") {
          console.log(`Webhook already processed for order: ${orderId}`);
          return new Response(JSON.stringify({ status: "already_processed" }), {
            status: 200,
          });
        }

        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: 10 } },
          }),

          prisma.transaction.upsert({
            where: { razorpayOrderId: orderId },
            update: {
              status: "SUCCESS",
              razorpayPaymentId: paymentId,
              razorpaySignature: signature,
            },
            create: {
              userId: userId,
              amount: orderEntity.amount, // Kept in paise per Razorpay standard
              currency: orderEntity.currency,
              creditsAdded: 10,
              status: "SUCCESS",
              razorpayOrderId: orderId,
              razorpayPaymentId: paymentId,
              razorpaySignature: signature,
            },
          }),
        ]);

        console.log(
          `Successfully added 10 credits and logged transaction for user: ${userId}`,
        );
      }
    }

    return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);

    return new Response("Webhook execution failed", { status: 500 });
  }
}
