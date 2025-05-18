"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Complaint } from "@/types/complaint.types";
import { Motion } from "../animations/MotionWrapper";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

interface ComplaintMapProps {
  complaints: Complaint[];
  initialCenter?: [number, number];
  initialZoom?: number;
  onMarkerClick?: (complaint: Complaint) => void;
}

export default function ComplaintMap({
  complaints,
  initialCenter = [-1.9706, 30.1044],
  initialZoom = 12,
  onMarkerClick,
}: ComplaintMapProps) {
  const t = useTranslations("Complaints");
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    const initMap = async () => {
      // Dynamically import markercluster to avoid SSR issues
      await import("leaflet.markercluster");

      // Initialize map
      const mapInstance = L.map(mapContainerRef.current!, {
        center: initialCenter,
        zoom: initialZoom,
      });

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      // Initialize marker cluster group
      clusterGroupRef.current = new L.MarkerClusterGroup();
      if (clusterGroupRef.current) {
        mapInstance.addLayer(clusterGroupRef.current);
      }

      mapRef.current = mapInstance;
      setIsLoading(false);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        clusterGroupRef.current = null;
      }
    };
  }, [initialCenter, initialZoom]);

  useEffect(() => {
    if (!mapRef.current || !clusterGroupRef.current || isLoading) return;

    // Clear existing markers
    clusterGroupRef.current.clearLayers();

    // Add new markers
    const markers: L.Marker[] = [];

    complaints.forEach((complaint) => {
      if (complaint.location) {
        try {
          const location =
            typeof complaint.location === "string"
              ? JSON.parse(complaint.location)
              : complaint.location;

          if (location?.coordinates) {
            const marker = L.marker([
              location.coordinates[1],
              location.coordinates[0],
            ]).bindPopup(
              `<b>${complaint.title}</b><br/>${complaint.category}<br/>${t(
                "status." + complaint.status
              )}`
            );

            if (onMarkerClick) {
              marker.on("click", () => onMarkerClick(complaint));
            }

            markers.push(marker);
          }
        } catch (e) {
          console.log("Error parsing location:", e);
        }
      }
    });

    if (markers.length > 0) {
      clusterGroupRef.current.addLayers(markers);

      // Fit bounds to show all markers
      const group = new L.FeatureGroup(markers);
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [complaints, isLoading, onMarkerClick, t]);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <p>{t("loadingMap")}</p>
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
