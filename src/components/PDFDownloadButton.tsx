"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { ReportPDF } from "@/components/ReportPDF";
import { ReportData } from "@/types/report";
import { buttonVariants } from "@/components/ui/button";

export default function PDFDownloadButton({
  reportData,
}: {
  reportData: ReportData;
}) {
  return (
    <PDFDownloadLink
      document={<ReportPDF reportData={reportData} />}
      fileName="validation-report.pdf"
    >
      {({ loading }) => (
        <span
          className={buttonVariants({
            variant: "outline",
            className:
              "gap-2 rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
          })}
        >
          <Download className="w-4 h-4" />
          {loading ? "Preparing PDF..." : "Export PDF"}
        </span>
      )}
    </PDFDownloadLink>
  );
}
