"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterestCategory {
  id: string;
  label: string;
}

interface Step3Props {
  setStep: (step: number) => void;
  selectedInterests: string[];
  toggleInterest: (id: string) => void;
  handleInterestsSubmit: () => void;
  isSavingInterests: boolean;
}

const interestCategories: InterestCategory[] = [
  { id: "tax-complaint", label: "Tax Complaint" },
  { id: "health-care", label: "Health Care" },
  { id: "housing", label: "Housing" },
  { id: "education", label: "Education" },
  { id: "transportation", label: "Transportation" },
  { id: "public-works", label: "Public Works" },
  { id: "sanitation", label: "Sanitation" },
  { id: "infrastructure", label: "Infrastructure" },
];

export const Step3InterestSelection = ({
  setStep,
  selectedInterests,
  toggleInterest,
  handleInterestsSubmit,
  isSavingInterests,
}: Step3Props) => {
  const t = useTranslations("Auth.Register");

  return (
    <>
      <button
        onClick={() => setStep(2)}
        className="flex items-center text-sm text-gray-600 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {t("back")}
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("steps.interests")}
      </h2>
      <p className="text-gray-600 mb-6">{t("selectInterestsDescription")}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {interestCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => toggleInterest(category.id)}
            className={`p-4 border rounded-lg transition ${
              selectedInterests.includes(category.id)
                ? "border-purple-500 bg-purple-50 text-purple-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <Button
        onClick={handleInterestsSubmit}
        className="w-full shadow shadow-amber-900 px-6"
        disabled={isSavingInterests}
      >
        {isSavingInterests && <Loader className="mr-2 h-5 w-5 animate-spin " />}{" "}
        {t("next")}
      </Button>
    </>
  );
};
