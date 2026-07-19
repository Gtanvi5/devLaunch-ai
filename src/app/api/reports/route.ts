// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reports = await prisma.report.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
