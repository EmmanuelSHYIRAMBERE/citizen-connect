import { getTranslations } from "next-intl/server";
import AnimatedChart from "@/components/data-viz/AnimatedChart";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AgencyReportsComponent = async () => {
  const t = await getTranslations("Admin.Departments");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
            <AnimatedChart />
          </Suspense>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
            <AnimatedChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AgencyReportsComponent;
