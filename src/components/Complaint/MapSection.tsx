"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { MapPinIcon, LocateFixed } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapComponent } from "./MapComponent";
import { FormData } from "./home.schema";
import { Input } from "../ui/input";

export function MapSection() {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [location, setLocation] = useState<[number, number] | null>(null);

  const {
    register,
    setValue,
    formState: { errors, isValid },
  } = useFormContext<FormData>();

  const onPositionUpdate = () => {
    if (!("getCurrentPosition" in window.navigator.geolocation)) {
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success: PositionCallback = (position) => {
      const coords: [number, number] = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      setLocation(coords);
      updateAddressFromCoords(coords);
    };

    const error: PositionErrorCallback = (err) => {
      console.error("Error getting location:", err);
      // Use a default location for Bucharest
      setLocation([44.4268, 26.1025]);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    onPositionUpdate();
  }, []);

  async function updateAddressFromCoords(coords: [number, number]) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
      );
      const data = await response.json();
      const address = data.address;
      const fullAddress = `${address.road} ${address.house_number}, ${address.city_district}`;
      setValue("address", fullAddress);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  }

  async function handleLocationChange(newLocation: [number, number]) {
    setLocation(newLocation);
    await updateAddressFromCoords(newLocation);
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 rounded-full border-none px-3 py-1"
        >
          {location ? "Locație detectată automat" : "Se detectează locația..."}
        </Badge>
        <Button
          variant="link"
          className="text-teal-700 underline p-0 flex items-center gap-2"
          onClick={() => setShowLocationPicker(true)}
        >
          Modifica Locatia
        </Button>
      </div>

      <div className="h-[200px] rounded-lg overflow-hidden relative">
        {location && (
          <>
            <MapComponent
              center={location}
              onLocationChange={handleLocationChange}
              showDraggableMarker={showLocationPicker}
              onCloseLocationPicker={() => setShowLocationPicker(false)}
            />
            <div className="absolute bottom-5 left-5 right-5 margin-auto z-10">
              <Form.Root>
                <Input
                  {...register("address")}
                  error={errors["address"]?.message}
                  label=""
                  placeholder=""
                  icon={<MapPinIcon className="h-4 w-4" />}
                  rightIcon={<LocateFixed className="h-4 w-4" />}
                  onRightIconClick={onPositionUpdate}
                />
              </Form.Root>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
