import { StickyHeader } from "@/components/layout/Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <StickyHeader title="Rezumatul Sesizarii" />
      {children}
    </div>
  );
}
