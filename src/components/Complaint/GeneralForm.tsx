"use client";

import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";
import { FormData } from "@/components/Complaint/home.schema";

import { Input } from "../ui/input";

export function GeneralForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <Form.Root>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Informații Raport</h2>
        <div className="space-y-4">
          <div>
            <Input
              label="Descrie problema"
              placeholder="Problema in cateva cuvinte"
              {...register("description")}
              error={errors["description"]?.message}
            />
          </div>
          <div>
            <Input
              label="Nume Complet"
              placeholder="Numele dvs. complet"
              {...register("fullName")}
              error={errors["fullName"]?.message}
            />
          </div>
          <div>
            <Input
              label="Adresa din buletin"
              placeholder="Adresa dvs."
              {...register("residenceAddress")}
              error={errors["residenceAddress"]?.message}
            />
          </div>
          <div>
            <Input
              label="Telefon"
              placeholder="Numărul dvs. de telefon"
              {...register("phone")}
              error={errors["phone"]?.message}
            />
          </div>
          <p>
            Datele tale personale sunt necesare pentru inregistrarea sesizarilor
            catre autoritati si bla bla bla
          </p>
        </div>
      </div>
    </Form.Root>
  );
}
