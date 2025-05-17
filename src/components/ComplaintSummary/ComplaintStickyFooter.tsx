"use client";

import { useRouter } from "next/navigation";

import { StickyFooter } from "../layout/StickyFooter";
import { useFormContext } from "react-hook-form";
import { ComplaintFormData } from "../Complaint/home.schema";
import { Button } from "../ui/button";
import { DELETE } from "@/lib/fetch";
import useSWRMutation from "swr/mutation";

export function ComplaintStickyFooter() {
  const router = useRouter();
  const { watch, reset } = useFormContext<ComplaintFormData>();
  const institutionEmail = watch("institutionEmail");
  const writtenEmail = watch("writtenEmail");
  const subject = watch("subject");
  const photos = watch("photos");
  const validPhotos = photos
    .filter((photo) => !!photo.url)
    .map((photo) => photo.id);

  const { trigger: deletePhoto } = useSWRMutation<
    { url: string; id: string },
    Error,
    string,
    { id: string }
  >("/api/upload", DELETE);

  const handleBack = () => {
    if (validPhotos.length > 0) {
      validPhotos.forEach((photo) => {
        deletePhoto({ id: photo });
      });
    }
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
