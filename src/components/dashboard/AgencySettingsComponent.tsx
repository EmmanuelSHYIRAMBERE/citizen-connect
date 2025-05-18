import { getTranslations } from "next-intl/server";

const AgencySettingsComponent = async () => {
  const t = await getTranslations("Admin.Users");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">{t("title")}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("noUsersFound")}
            </p>
          </div>

          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            {t("addNew")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencySettingsComponent;
