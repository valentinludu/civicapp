import { ReactNode } from "react";
import { StickyHeader } from "@/components/layout/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <StickyHeader title="Raportează o problemă" />
      {children}
    </>
  );
}
