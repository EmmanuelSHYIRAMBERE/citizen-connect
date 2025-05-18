"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Motion } from "../animations/MotionWrapper";

interface InteractiveMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function InteractiveMap({
  onLocationSelect,
  initialLocation,
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Initialize map
      mapRef.current = L.map(mapContainerRef.current!, {
        center: initialLocation
          ? [initialLocation.lat, initialLocation.lng]
          : [-1.9706, 30.1044],
        zoom: initialLocation ? 15 : 12,
      });

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Create initial marker if location exists
      if (initialLocation) {
        markerRef.current = L.marker(
          [initialLocation.lat, initialLocation.lng],
          {
            draggable: true,
          }
        ).addTo(mapRef.current);
      }

      // Set up click handler
      mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        onLocationSelect({ lat, lng });

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], {
            draggable: true,
          }).addTo(mapRef.current!);
        }
      });

      setIsLoading(false);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialLocation, onLocationSelect]);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <p>Loading map...</p>
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="h-full w-full rounded-lg z-0"
        style={{ minHeight: "400px" }}
      />
    </Motion.div>
  );
}
