import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Now that Prisma knows about the User model, we can use findUnique
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true }, // Only fetch what we need
    });

    // If the user doesn't exist in our DB yet, they effectively have 10 credits
    const credits = user?.credits ?? 10;

    return NextResponse.json({ credits }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
