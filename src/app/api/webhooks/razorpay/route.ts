import { headers } from "next/headers";
import crypto from "crypto";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    // 1. Get the raw body as text (REQUIRED for cryptographic signature verification)
    const body = await req.text();
    const signature = (await headers()).get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return new Response("Missing signature or secret", { status: 400 });
    }

    // 2. Generate our own signature using the raw body and our secret
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    // 3. Compare signatures to ensure hackers didn't fake this request
    if (expectedSignature !== signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    // 4. Parse the body now that we know it is secure
    const event = JSON.parse(body);

    // 5. Handle a successful payment (Razorpay uses "order.paid")
    if (event.event === "order.paid") {
      // Extract the userId we passed into the "notes" object during checkout
      const userId = event.payload.order.entity.notes?.userId;

      if (userId) {
        // 6. Securely add 10 credits to the user's account in Neon Postgres
        await db
          .update(users)
          .set({ credits: sql`${users.credits} + 10` })
          .where(eq(users.id, userId));

        console.log(`Successfully added 10 credits to user: ${userId}`);
      }
    }

    // Always return 200 OK so Razorpay knows we received it
    return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook execution failed", { status: 500 });
  }
}
