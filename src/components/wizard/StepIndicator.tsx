"use client";

import { useTranslations } from "next-intl";

export default function StepIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  const t = useTranslations("Complaints.steps");

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          <div
            className={`ml-2 ${
              index <= currentStep ? "font-semibold" : "text-gray-500"
            }`}
          >
            {t(step as string)}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-2 h-0.5 w-8 ${
                index < currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
