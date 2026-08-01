import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, TrendingUp, AlertTriangle } from "lucide-react";
import RevenueChart from "@/components/RevenueChart";

interface Swot {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface Competitor {
  name: string;
  advantage: string;
  weakness: string;
}

interface RevenueDataPoint {
  year: number;
  conservative: number;
  optimistic: number;
}

export default async function ReportPage({
  params,
}: {
  // 1. Update the type to be a Promise for Next.js 15+ compatibility
  params: Promise<{ id: string }>;
}) {
  // 2. Await the params before destructuring
  const { id } = await params;

  // 3. Verify user is authenticated
  const { userId } = await auth();
  if (!userId) redirect("/");

  // 4. Fetch the report
  const report = await prisma.report.findUnique({
    where: { id },
  });

  // 5. Security check: Does it exist? Does it belong to this user?
  if (!report || report.userId !== userId) {
    notFound();
  }

  const idea = (
    report as unknown as {
      idea?: { title: string | null; description: string | null } | null;
    }
  )?.idea;

  // 6. Safe JSON parsing: Add fallback empty states so the UI never crashes
  // even if the AI validation engine failed to populate a specific JSON field.
  const reportData = report as unknown as {
    swotAnalysis?: unknown;
    competitors?: unknown;
    revenuePrediction?: unknown;
  };

  const swot = (reportData.swotAnalysis as unknown as Swot) || {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  };
  const competitors = (reportData.competitors as unknown as Competitor[]) || [];
  const revenueData =
    (reportData.revenuePrediction as unknown as RevenueDataPoint[]) || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {idea?.title || "Validation Report"}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {idea?.description}
          </p>
        </div>

        {/* Financial Projections */}
        {revenueData.length > 0 && (
          <Card className="border-0 shadow-lg shadow-zinc-200/50 dark:shadow-none dark:border dark:border-zinc-800 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-zinc-900 dark:text-white">
                <TrendingUp className="text-violet-500" />
                3-Year Revenue Projections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart data={revenueData} />
            </CardContent>
          </Card>
        )}

        {/* SWOT Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-t-4 border-t-emerald-500 shadow-md dark:shadow-none dark:bg-zinc-900/50 dark:border-x-zinc-800 dark:border-b-zinc-800">
            <CardHeader>
              <CardTitle className="flex gap-2 text-zinc-900 dark:text-white">
                <CheckCircle2 className="text-emerald-500" /> Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
                {swot.strengths?.length > 0 ? (
                  swot.strengths.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))
                ) : (
                  <li className="text-zinc-400 italic list-none -ml-5">
                    No strengths identified.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-red-500 shadow-md dark:shadow-none dark:bg-zinc-900/50 dark:border-x-zinc-800 dark:border-b-zinc-800">
            <CardHeader>
              <CardTitle className="flex gap-2 text-zinc-900 dark:text-white">
                <XCircle className="text-red-500" /> Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
                {swot.weaknesses?.length > 0 ? (
                  swot.weaknesses.map((w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ))
                ) : (
                  <li className="text-zinc-400 italic list-none -ml-5">
                    No weaknesses identified.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-blue-500 shadow-md dark:shadow-none dark:bg-zinc-900/50 dark:border-x-zinc-800 dark:border-b-zinc-800">
            <CardHeader>
              <CardTitle className="flex gap-2 text-zinc-900 dark:text-white">
                <TrendingUp className="text-blue-500" /> Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
                {swot.opportunities?.length > 0 ? (
                  swot.opportunities.map((o: string, i: number) => (
                    <li key={i}>{o}</li>
                  ))
                ) : (
                  <li className="text-zinc-400 italic list-none -ml-5">
                    No opportunities identified.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500 shadow-md dark:shadow-none dark:bg-zinc-900/50 dark:border-x-zinc-800 dark:border-b-zinc-800">
            <CardHeader>
              <CardTitle className="flex gap-2 text-zinc-900 dark:text-white">
                <AlertTriangle className="text-amber-500" /> Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
                {swot.threats?.length > 0 ? (
                  swot.threats.map((t: string, i: number) => (
                    <li key={i}>{t}</li>
                  ))
                ) : (
                  <li className="text-zinc-400 italic list-none -ml-5">
                    No threats identified.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Analysis */}
        {competitors.length > 0 && (
          <Card className="border-0 shadow-lg shadow-zinc-200/50 dark:shadow-none dark:border dark:border-zinc-800 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-900 dark:text-white">
                Competitor Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {competitors.map((comp: Competitor, i: number) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-700/50 transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">
                    {comp.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                      Advantage:
                    </span>{" "}
                    {comp.advantage}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                      Weakness:
                    </span>{" "}
                    {comp.weakness}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
