"use client";

import { useRouter } from "next/navigation";

import { StickyFooter } from "../layout/StickyFooter";
import { useFormContext } from "react-hook-form";
import { FormData } from "../Complaint/home.schema";
import { Button } from "../ui/button";

export function ComplaintStickyFooter() {
  const router = useRouter();
  const { watch, reset } = useFormContext<FormData>();
  const institutionEmail = watch("institutionEmail");
  const writtenEmail = watch("writtenEmail");
  const subject = watch("subject");

  const handleBack = () => {
    reset();
    router.push("/complaint");
  };

  const isDisabled = !writtenEmail || !institutionEmail;

  return (
    <div className="gap-2 flex flex-col mt-4">
      <StickyFooter
        buttonText="Trimite sesizarea"
        href={`mailto:${institutionEmail}?subject=${subject}&body=${encodeURIComponent(
          writtenEmail ?? ""
        )}`}
        disabled={isDisabled}
      />
      <Button className="w-full" onClick={handleBack} variant="outline">
        Anuleaza
      </Button>
    </div>
  );
}
