"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

import { StickyFooter } from "../layout/StickyFooter";
import { useFormContext } from "react-hook-form";
import { ComplaintFormData } from "./home.schema";
import { POST } from "@/lib/fetch";

export function ComplaintStickyFooter() {
  const router = useRouter();

  const { trigger, error, isMutating } = useSWRMutation<
    { message: string; email: string; subject: string },
    Error,
    string,
    ComplaintFormData
  >("/api/ai-complaint", POST);

  const {
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useFormContext<ComplaintFormData>();

  async function handleSubmitData() {
    handleSubmit(
      async (_data) => {
        const data = await trigger(_data);

        if (data?.message) {
          setValue("writtenEmail", data.message);
          setValue("institutionEmail", data.email);
          setValue("subject", data.subject);
          router.push("/complaint-summary");
        }
      },
      (errors) => {
        // Log each field's error details
        Object.entries(errors).forEach(([field, error]) => {
          console.log(`Field "${field}" error:`, error);
        });
      }
    )();
  }

  return (
    <>
      <StickyFooter
        buttonText="Compune sesizarea"
        onClick={handleSubmitData}
        disabled={!isValid || isMutating}
        loading={isMutating}
      />
      {error?.message && <p className="text-red-500">{error.message}</p>}
    </>
  );
}
