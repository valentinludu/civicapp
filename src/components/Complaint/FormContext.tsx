"use client";

import { ComplaintFormData, schema } from "@/components/Complaint/home.schema";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function HomeFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<ComplaintFormData>({
    defaultValues: {
      description: "",
      fullName: "",
      address: "",
      phone: "",
      photos: [
        { id: "", url: "" },
        { id: "", url: "" },
        { id: "", url: "" },
        { id: "", url: "" },
      ],
      institutionEmail: "",
      writtenEmail: "",
    },
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
