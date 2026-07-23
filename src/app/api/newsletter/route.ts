import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ ERROR: Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email service misconfigured" },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email: email },
      update: { active: true },
      create: { email: email },
    });

    const { data, error } = await resend.emails.send({
      from: "DevLaunch <hello@devlaunch.ai>",
      to: [email],
      bcc: process.env.ADMIN_EMAIL ? [process.env.ADMIN_EMAIL] : [],
      subject: "Welcome to DevLaunch AI! 🚀",
      html: "Thanks for subscribing! We will share the latest updates with you soon.",
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send welcome email." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
