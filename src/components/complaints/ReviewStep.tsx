"use client";

import { Button } from "@/components/ui/button";
import { ReviewStepData } from "@/types/complaint.types";
import { useTranslations } from "next-intl";

const ReviewStep = ({
  data,
  onSubmit,
  onBack,
}: {
  data: ReviewStepData;
  onSubmit: () => void;
  onBack: () => void;
}) => {
  const t = useTranslations("Complaints");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("steps.review")}</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{t("form.title")}</h3>
            <p>{data.title}</p>
          </div>
          <div>
            <h3 className="font-medium">{t("form.description")}</h3>
            <p>{data.description}</p>
          </div>
          <div>
            <h3 className="font-medium">{t("form.category")}</h3>
            <p>{t(`Complaints.categories.${data.category}`)}</p>
          </div>
          <div>
            <h3 className="font-medium">{t("form.location")}</h3>
            <p>{data.location?.address || "Location selected"}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t("form.back")}
        </Button>
        <Button onClick={onSubmit}>{t("form.submit")}</Button>
      </div>
    </div>
  );
};

export default ReviewStep;
