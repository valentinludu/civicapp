import { Metadata } from "next";
import { ComplaintStickyFooter } from "@/components/ComplaintSummary/ComplaintStickyFooter";
import { Title } from "@/components/ComplaintSummary/Title";
import { ComplaintSummaryForm } from "@/components/ComplaintSummary/ComplaintSummaryForm";
import { ComplaintSummaryHeader } from "@/components/ComplaintSummary/ComplaintSummaryHeader";

export const metadata: Metadata = {
  title: "Rezumatul Sesizării",
  description: "Vezi rezumatul sesizării înainte sa o trimiti",
};

export default function AnalysisPage() {
  return (
    <div className="flex flex-col bg-gray-50">
      <ComplaintSummaryHeader />

      {/* AI Analysis Section */}
      <div className="bg-white rounded-lg p-4">
        <Title title="Analiză AI" />

        <ComplaintSummaryForm />

        <ComplaintStickyFooter />
      </div>
    </div>
  );
}
