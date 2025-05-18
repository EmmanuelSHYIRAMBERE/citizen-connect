"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiSettings,
  FiDatabase,
} from "react-icons/fi";
import { Expand, ListCollapseIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Motion } from "../animations/MotionWrapper";

interface SidebarLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Admin");

  const links: SidebarLink[] = [
    {
      href: "/admin/dashboard",
      icon: <FiHome />,
      label: t("Complaints.title"),
    },
    { href: "/admin/users", icon: <FiUsers />, label: t("Users.title") },
    {
      href: "/admin/complaints",
      icon: <FiFileText />,
      label: t("Complaints.title"),
    },
    {
      href: "/admin/departments",
      icon: <FiDatabase />,
      label: t("Departments.title"),
    },
    { href: "/admin/settings", icon: <FiSettings />, label: t("Users.title") },
  ];

  return (
    <aside
      className={`h-screen bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? (
            <Expand className="w-6 h-6 mx-auto" />
          ) : (
            <span className="flex items-center justify-between">
              <span className="font-semibold">CitizenConnect</span>
              <ListCollapseIcon className="w-6 h-6" />
            </span>
          )}
        </button>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <Motion.div
                    whileHover={{ scale: isCollapsed ? 1.1 : 1.05 }}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === link.href
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="text-lg">{link.icon}</div>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <Motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3"
                        >
                          {link.label}
                        </Motion.span>
                      )}
                    </AnimatePresence>
                  </Motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
