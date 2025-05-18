import { getTranslations } from "next-intl/server";
import StatsCounter from "@/components/data-viz/StatsCounter";
import AnimatedCard from "@/components/animations/AnimatedCard";
import AnimatedChart from "@/components/data-viz/AnimatedChart";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AgencyDashboardComponent = async () => {
  const t = await getTranslations("Admin");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("Complaints.title")}</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard className="bg-blue-500">
          <StatsCounter
            endValue={125}
            title={t("Complaints.status.submitted")}
            icon="📝"
            color="bg-blue-100"
          />
        </AnimatedCard>
        <AnimatedCard delay={0.2} className="bg-yellow-500">
          <StatsCounter
            endValue={89}
            title={t("Complaints.status.inProgress")}
            icon="🔄"
            color="bg-yellow-100"
          />
        </AnimatedCard>
        <AnimatedCard delay={0.4} className="bg-green-500">
          <StatsCounter
            endValue={42}
            title={t("Complaints.status.resolved")}
            icon="✅"
            color="bg-green-100"
          />
        </AnimatedCard>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {t("Complaints.publicDashboard")}
        </h2>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
          <AnimatedChart />
        </Suspense>
      </div>
    </div>
  );
};

export default AgencyDashboardComponent;
