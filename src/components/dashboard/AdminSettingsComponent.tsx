import { getTranslations } from "next-intl/server";
import SettingsForm from "@/components/admin/SettingsForm";

const AdminSettingsComponent = async () => {
  const t = await getTranslations("Admin.Users");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
          <SettingsForm />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Version</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">1.0.0</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Last Updated</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2023-11-15
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsComponent;
