import ReportViewer from "@/components/ReportViewer";
import { getReportById } from "@/lib/db";
import { notFound } from "next/navigation";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const reportData = await getReportById(id);

  if (!reportData) {
    notFound();
  }

  return <ReportViewer reportData={reportData} />;
}
