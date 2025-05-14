"use client";

import { useRouter } from "next/navigation";
import { StickyHeader } from "../layout/Header";

export function ComplaintSummaryHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/complaint");
  };

  return <StickyHeader title="Rezumatul Sesizării" onBack={handleBack} />;
}
