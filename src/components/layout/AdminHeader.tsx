"use client";

import { FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import NotificationCenter from "../notifications/NotificationCenter";
import { ThemeToggle } from "../ui/ThemeToggle";
import { UserButton } from "./UserButton";

const AdminHeader = () => {
  const t = useTranslations("Admin");

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("Complaints.searchPlaceholder")}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
