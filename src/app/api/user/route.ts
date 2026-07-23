import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    const credits = user?.credits ?? 10;

    return NextResponse.json({ credits }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user credits:", error);
    return NextResponse.json(
      { error: "Failed to load credit balance." },
      { status: 500 },
    );
  }
}
