import { getTranslations } from "next-intl/server";
import AnimatedCard from "@/components/animations/AnimatedCard";
import StatsCounter from "@/components/data-viz/StatsCounter";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ComplaintList from "../complaints/ComplaintList.tsx";

const CitizenComplaintsComponent = async () => {
  const t = await getTranslations("Citizen");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("dashboard")}</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard>
          <StatsCounter
            endValue={0}
            title={t("stats.submitted")}
            icon="📝"
            color="bg-blue-100"
          />
        </AnimatedCard>
        <AnimatedCard delay={0.2}>
          <StatsCounter
            endValue={0}
            title={t("stats.inProgress")}
            icon="🔄"
            color="bg-yellow-100"
          />
        </AnimatedCard>
        <AnimatedCard delay={0.4}>
          <StatsCounter
            endValue={0}
            title={t("stats.resolved")}
            icon="✅"
            color="bg-green-100"
          />
        </AnimatedCard>
      </div>

      {/* Recent Complaints */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t("recentComplaints")}</h2>
          <button className="text-primary hover:underline">
            {t("viewAll")}
          </button>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          }
        >
          <ComplaintList />
        </Suspense>
      </div>
    </div>
  );
};

export default CitizenComplaintsComponent;
