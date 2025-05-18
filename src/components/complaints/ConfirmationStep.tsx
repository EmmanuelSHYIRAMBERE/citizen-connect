"use client";

import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ConfirmationStep = () => {
  const t = useTranslations("Complaints");

  return (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="mt-3 text-xl font-semibold">{t("steps.confirmation")}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t("form.submitSuccess")}
      </p>
      <div className="mt-6">
        <Link href="/complaints">
          <Button>{t("publicDashboard")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationStep;
