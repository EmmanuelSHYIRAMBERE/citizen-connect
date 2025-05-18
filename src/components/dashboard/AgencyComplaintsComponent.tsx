import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ComplaintList from "../complaints/ComplaintList.tsx";

const AgencyComplaintsComponent = async () => {
  const t = await getTranslations("Admin.Complaints");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addNew")}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">{t("allStatuses")}</option>
            {Object.entries(t.raw("status")).map(([key, value]) => (
              <option key={key} value={key}>
                {value as string}
              </option>
            ))}
          </select>
          <select className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">{t("allCategories")}</option>
            {Object.entries(t.raw("categories")).map(([key, value]) => (
              <option key={key} value={key}>
                {value as string}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Complaint List */}
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
  );
};

export default AgencyComplaintsComponent;
