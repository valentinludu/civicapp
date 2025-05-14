"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

// Create a component to initialize Leaflet icons
function LeafletInitializer() {
  useEffect(() => {
    // Make sure we're in browser environment
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    }
  }, []);

  return null;
}

function DraggableMarker({
  position,
  onPositionChange,
}: {
  position: [number, number];
  onPositionChange: (pos: [number, number]) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        onPositionChange([newPos.lat, newPos.lng]);
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

function MapView({
  position,
  onPositionChange,
}: {
  position: [number, number];
  onPositionChange?: (pos: [number, number]) => void;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return (
    <DraggableMarker
      position={position}
      onPositionChange={(pos) => onPositionChange?.(pos)}
    />
  );
}

interface MapComponentProps {
  center: [number, number];
  onLocationChange: (newLocation: [number, number]) => void;
  showDraggableMarker: boolean;
  onCloseLocationPicker: () => void;
}

export function MapComponent({
  center,
  onLocationChange,
  showDraggableMarker,
  onCloseLocationPicker,
}: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
        Loading map...
      </div>
    );

  return (
    <>
      <LeafletInitializer />
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapView position={center} onPositionChange={onLocationChange} />
      </MapContainer>

      {showDraggableMarker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Modifică Locația</h3>
              <p className="text-sm text-gray-500">
                Trage marker-ul pentru a seta locația exactă
              </p>
            </div>
            <div className="h-[400px]">
              <MapContainer center={center} zoom={15} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapView
                  position={center}
                  onPositionChange={onLocationChange}
                />
              </MapContainer>
            </div>
            <div className="p-4 flex justify-end">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md"
                onClick={onCloseLocationPicker}
              >
                Confirmă
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
