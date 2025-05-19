"use client";

import { Button } from "@/components/ui/button";
import { NewComplaintData } from "@/types/complaint.types";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";

interface LocationStepProps {
  initialData: NewComplaintData;
  onNext: (data: NewComplaintData) => void;
  onBack: () => void;
}

// interface InteractiveMapProps {
//   onLocationSelect: (location: { lat: number; lng: number }) => void;
//   initialLocation?: { lat: number; lng: number };
// }

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/ui/InteractiveMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const LocationStep = ({ initialData, onNext, onBack }: LocationStepProps) => {
  const t = useTranslations("Complaints");
  const [location, setLocation] = useState<
    { lat: number; lng: number } | undefined
  >(initialData.location as { lat: number; lng: number } | undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      // Create location object with required fields
      const locationData = {
        address: `${location.lat},${location.lng}`,
        district: "",
        sector: "",
        cell: "",
      };
      onNext({ ...initialData, location: locationData });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("steps.location")}</h2>

      <div className="h-96 rounded-lg overflow-hidden bg-gray-100">
        <MapWithNoSSR
          onLocationSelect={setLocation}
          initialLocation={location}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t("form.back")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!location}
          className="bg-yellow-500 shadow shadow-black"
        >
          {t("form.next")}
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
