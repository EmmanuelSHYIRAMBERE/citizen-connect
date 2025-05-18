"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import WizardForm from "@/components/wizard/WizardForm";
import StepIndicator from "@/components/wizard/StepIndicator";
import ComplaintForm from "@/components/complaints/ComplaintForm";
import LocationStep from "@/components/complaints/LocationStep";
import ReviewStep from "@/components/complaints/ReviewStep";
import ConfirmationStep from "@/components/complaints/ConfirmationStep";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Motion } from "../animations/MotionWrapper";
import { NewComplaintData } from "@/types/complaint.types";

const steps = ["details", "location", "review", "confirmation"];

const NewComplaintComponent = () => {
  const t = useTranslations("Complaints");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<NewComplaintData>({
    title: "",
    description: "",
    category: "",
    location: {
      address: "",
      district: "",
      sector: "",
      cell: "",
    } as { address: string; district: string; sector: string; cell: string },
    attachments: [] as File[],
  });

  const handleNext = (data: NewComplaintData) => {
    setFormData((prev) => {
      if (data.location && typeof data.location === "object") {
        return {
          ...prev,
          ...data,
          location: {
            address: data.location.address || "",
            district: data.location.district || "",
            sector: data.location.sector || "",
            cell: data.location.cell || "",
          },
        };
      } else {
        return prev;
      }
    });
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    // API call to submit complaint
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedCard>
        <div className="max-w-3xl mx-auto">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            {t("submitComplaint")}
          </Motion.h1>

          <StepIndicator
            steps={steps.map((step) => t(`steps.${step}`))}
            currentStep={currentStep}
          />

          <WizardForm steps={steps} onSubmit={handleSubmit}>
            <ComplaintForm />
            <LocationStep
              initialData={formData}
              onNext={handleNext}
              onBack={handleBack}
            />
            {typeof formData.location === "object" ? (
              <ReviewStep
                data={formData}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            ) : (
              <div>Error: Location data is invalid</div>
            )}
            <ConfirmationStep />
          </WizardForm>
        </div>
      </AnimatedCard>
    </div>
  );
};
export default NewComplaintComponent;
