"use client";

import { useState } from "react";
import { toast } from "sonner"; // Or "react-hot-toast", "@/components/ui/use-toast", etc.
import ReportView from "@/app/dashboard/report/[id]/ReportView";
import ReportSkeleton from "@/components/ReportSkeleton";
import { ReportData } from "@/types/report";
import { Button } from "@/components/ui/button";

export default function AnalysisPage() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const generateReport = async () => {
    setIsLoading(true);

    // 1. Create an AbortController to handle timeouts
    const controller = new AbortController();

    // Set a 20-second timeout limit for the AI to respond
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
        signal: controller.signal, // Attach the abort signal to the fetch request
      });

      clearTimeout(timeoutId); // Clear the timeout if the request succeeds early

      // 2. Handle HTTP errors (e.g., 500 Internal Server Error, 400 Bad Request)
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error ||
            `Server responded with status: ${response.status}`,
        );
      }

      const data = await response.json();
      setReportData(data);

      // Optional: Success toast
      toast.success("Analysis complete!");
    } catch (error: unknown) {
      clearTimeout(timeoutId); // Ensure timeout is cleared on error

      // 3. Differentiate between a Timeout and a standard Error
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          toast.error("Request timed out", {
            description: "The AI took too long to respond. Please try again.",
          });
        } else {
          // Display the actual error message from the backend (if provided)
          toast.error("Analysis Failed", {
            description: error.message,
          });
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      console.error("Failed to generate report:", error);
    } finally {
      // 4. Always reset loading state so the user can edit and retry
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (reportData) {
    return <ReportView reportData={reportData} />;
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Validate Your AI Idea</h1>
      <textarea
        className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent mb-4 min-h-[150px]"
        placeholder="Describe your hardware or software pitch..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <Button
        onClick={generateReport}
        disabled={idea.length < 10}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-12"
      >
        Generate Deep Analysis
      </Button>
    </div>
  );
}
