"use client";

import { useState } from "react";
import { ReportData } from "@/types/report";
import { Layout, Presentation } from "lucide-react";

import ReportClient from "@/app/dashboard/report/[id]/ReportClient";
import ReportView from "@/app/dashboard/report/[id]/ReportView";

export default function ReportViewer({
  reportData,
}: {
  reportData: ReportData;
}) {
  const [viewMode, setViewMode] = useState<"presentation" | "document">(
    "presentation",
  );

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-500 truncate max-w-[50%]">
          Validation:{" "}
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">
            {reportData.idea || reportData.prompt}
          </span>
        </div>

        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setViewMode("presentation")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "presentation"
                ? "bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <Presentation className="w-4 h-4" />
            Presentation
          </button>
          <button
            onClick={() => setViewMode("document")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "document"
                ? "bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <Layout className="w-4 h-4" />
            Document
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        {viewMode === "presentation" ? (
          <ReportView reportData={reportData} />
        ) : (
          <ReportClient reportData={reportData} />
        )}
      </main>
    </div>
  );
}
