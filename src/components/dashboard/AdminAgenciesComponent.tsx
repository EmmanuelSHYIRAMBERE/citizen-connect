import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AgencyTable from "@/components/admin/AgencyTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminAgenciesComponent = async () => {
  const t = await getTranslations("Admin.Departments");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addNew")}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Agency Table */}
      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        }
      >
        <AgencyTable />
      </Suspense>
    </div>
  );
};

export default AdminAgenciesComponent;
