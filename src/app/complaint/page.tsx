import ComplaintPage from "@/components/Complaint/ComplaintPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raportează o problemă",
  description: "Raportează o problemă în orice moment și oriunde",
};

export default function Page() {
  return <ComplaintPage />;
}
