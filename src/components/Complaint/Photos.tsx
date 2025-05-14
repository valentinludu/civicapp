"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Trash2Icon, ExpandIcon, XIcon, CameraIcon } from "lucide-react";
import { Card } from "../ui/card";

import Webcam from "react-webcam";
import { useFormContext } from "react-hook-form";
import { FormData } from "./home.schema";

export function Photos() {
  const webcamRef = useRef<Webcam>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { setValue, watch } = useFormContext<FormData>();
  const photos = watch("photos");
  const currentPhotoIndex = photos.filter(Boolean).length;

  const capturePhoto = () => {
    if (webcamRef.current) {
      const photo = webcamRef.current.getScreenshot();
      if (photo && currentPhotoIndex < 4) {
        const newPhotos = [...photos];
        newPhotos[currentPhotoIndex] = photo;
        setValue("photos", newPhotos);
      }
    }
  };

  const deletePhoto = (index: number) => {
    let newPhotos = [...photos];
    newPhotos.splice(index, 1);
    newPhotos = [...newPhotos, ""];
    setValue("photos", newPhotos);
    setSelectedPhoto(null);
  };

  return (
    <div className="mb-6">
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
        />

        <Button
          onClick={capturePhoto}
          size="lg"
          disabled={currentPhotoIndex >= 4}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-teal-700 shadow-lg"
        >
          <span className="sr-only">Take photo</span>
          <CameraIcon style={{ fontSize: 40, width: 30, height: 30 }} />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <Card className="aspect-square rounded-lg overflow-hidden">
              {photo ? (
                <img
                  src={photo}
                  alt={`Captured photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </Card>
            {photo && (
              <div className="absolute top-1 right-1 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 bg-black/50 hover:bg-black/70"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <ExpandIcon className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 bg-black/50 hover:bg-black/70"
                  onClick={() => deletePhoto(index)}
                >
                  <Trash2Icon className="h-4 w-4 text-white" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Photo in fullscreen modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <img
              src={selectedPhoto}
              alt="Selected capture"
              className="w-full rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedPhoto(null)}
            >
              <XIcon className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
