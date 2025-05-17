"use client";

import { ComplaintFormData } from "@/components/Complaint/home.schema";
import { createContext, ReactNode, useContext } from "react";

type ComplaintContextType = {
  formData: ComplaintFormData;
  setFormData: (formData: ComplaintFormData) => void;
};

export function ComplaintContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(
  undefined
);

export function useComplaintContext() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error(
      "useComplaintContext must be used within a ComplaintContextProvider"
    );
  }
  return context;
}
