"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import StepIndicator from "./StepIndicator";

export default function WizardForm({
  steps,
  children,
  onSubmit,
  currentStepReady,
}: {
  steps: string[];
  children: ReactNode[];
  onSubmit: () => void;
  currentStepReady?: number;
}) {
  const t = useTranslations("Complaints.form");
  const [currentStep, setCurrentStep] = useState(currentStepReady || 0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <StepIndicator currentStep={currentStep} steps={steps} />

      <div className="mb-6">{children[currentStep]}</div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          {t("back")}
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-yellow-500 shadow shadow-black"
          >
            {t("next")}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            className="bg-yellow-500 shadow shadow-black"
          >
            {t("submit")}
          </Button>
        )}
      </div>
    </div>
  );
}
