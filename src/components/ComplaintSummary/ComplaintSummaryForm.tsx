"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ComplaintFormData } from "@/components/Complaint/home.schema";
import { Textarea } from "@/components/ui/textarea";
import * as Form from "@radix-ui/react-form";

export function ComplaintSummaryForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ComplaintFormData>();

  return (
    <Form.Root>
      <Input
        label="Tipul Problemei Semnalate"
        placeholder="Problema"
        {...register("subject")}
        error={errors["subject"]?.message}
      />

      <Input
        label="Locatia problemei"
        placeholder="Locatia"
        {...register("address")}
        error={errors["address"]?.message}
      />

      <Input
        label="Catre"
        placeholder="email@bucuresti.ro"
        {...register("institutionEmail")}
        error={errors["institutionEmail"]?.message}
      />

      <Textarea
        label="Continutul emailului"
        placeholder="Continutul emailului"
        {...register("writtenEmail")}
        error={errors["writtenEmail"]?.message}
      />
    </Form.Root>
  );
}
