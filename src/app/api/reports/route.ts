import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const limit = Math.min(parseInt(limitParam || "50", 10), 100);
    const page = Math.max(parseInt(pageParam || "1", 10), 1);
    const skip = (page - 1) * limit;

    const [reports, totalCount] = await Promise.all([
      prisma.report.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          title: true,
          score: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: skip,
      }),
      prisma.report.count({
        where: { userId: userId },
      }),
    ]);

    return NextResponse.json(
      {
        reports,
        meta: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data." },
      { status: 500 },
    );
  }
}
