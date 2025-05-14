"use client";

import dynamic from "next/dynamic";
import { ComplaintStickyFooter } from "@/components/Complaint/ComplaintStickyFooter";
import { GeneralForm } from "@/components/Complaint/GeneralForm";

const MapWithNoSSR = dynamic(
  () =>
    import("../../components/Complaint/MapSection").then(
      (mod) => mod.MapSection
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
        Loading map...
      </div>
    ),
  }
);

const PhotosWithNoSSR = dynamic(
  () => import("../../components/Complaint/Photos").then((mod) => mod.Photos),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
        Loading photos....
      </div>
    ),
  }
);

export default function ComplaintPage() {
  return (
    <div>
      {/* Map section */}
      <MapWithNoSSR />

      {/* Camera section */}
      <PhotosWithNoSSR />

      {/* Form section */}
      <GeneralForm />

      {/* Bottom button */}
      <ComplaintStickyFooter />
    </div>
  );
}
