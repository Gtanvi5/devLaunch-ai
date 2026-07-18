// src/app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "../../../../db/index";
import { users } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to .env.local");
  }

  // Next.js 15 requires awaiting the headers() function
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  // Next.js 15 App Router standard: get the raw body as text for verification
  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Invalid signature", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  // Handle the Database Sync via Drizzle
  if (eventType === "user.created") {
    const primaryEmail = evt.data.email_addresses[0].email_address;

    await db.insert(users).values({
      id: id as string,
      email: primaryEmail,
      credits: 3, // Default free tier credits
    });
  }

  if (eventType === "user.deleted") {
    await db.delete(users).where(eq(users.id, id as string));
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
