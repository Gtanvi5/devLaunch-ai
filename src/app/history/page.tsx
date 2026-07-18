import { db } from "@/db";
import { reports } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, ArrowRight, Clock } from "lucide-react";

export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch all reports for this user, ordered by newest first
  const userReports = await db.query.reports.findMany({
    where: eq(reports.userId, userId),
    with: {
      idea: true,
    },
    orderBy: [desc(reports.createdAt)],
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
              <BrainCircuit className="text-violet-500" />
              My Validations
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
              Review your past AI startup validation reports.
            </p>
          </div>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 transition-all hover:scale-105 shadow-md hover:shadow-lg">
              New Report
            </Button>
          </Link>
        </div>

        {userReports.length === 0 ? (
          <div className="text-center py-24 px-6 bg-white dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-500/10 mb-6">
              <BrainCircuit className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              No reports found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              You haven&apos;t validated any ideas yet. Whether you are building
              a B2B analytics tool, a two-sided marketplace, or pushing
              boundaries with an adaptive olfactory operating system using smart
              scent pods, it&apos;s time to see if the market is ready.
            </p>
            <Link href="/dashboard">
              <Button className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors">
                Generate your first report
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userReports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-xl dark:hover:shadow-violet-500/10 transition-all duration-300 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 flex flex-col justify-between group"
              >
                <CardHeader>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mb-3 gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(report.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <CardTitle className="text-xl text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {report.idea?.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-zinc-600 dark:text-zinc-400 mt-2">
                    {report.idea?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/report/${report.id}`}>
                    <Button
                      variant="secondary"
                      className="w-full group/btn bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white transition-colors"
                    >
                      View Analysis
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
