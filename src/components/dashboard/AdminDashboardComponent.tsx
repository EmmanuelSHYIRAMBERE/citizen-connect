"use client";

import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";
import ComplaintChart from "../data-viz/ComplaintChart";
import DepartmentStats from "../data-viz/DepartmentStats";
import RecentActivity from "../data-viz/RecentActivity";
import { Motion } from "../animations/MotionWrapper";

const AdminDashboardComponent = () => {
  const t = useTranslations("Admin");
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolved: 0,
    inProgress: 0,
    departments: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [complaintsRes, departmentsRes] = await Promise.all([
          fetch("/api/stats/complaints"),
          fetch("/api/stats/departments"),
        ]);

        const complaintsData = await complaintsRes.json();
        const departmentsData = await departmentsRes.json();

        setStats({
          totalComplaints: complaintsData.total,
          resolved: complaintsData.resolved,
          inProgress: complaintsData.inProgress,
          departments: departmentsData.total,
        });
      } catch (error) {
        console.log("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <Motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        {t("dashboard")}
      </Motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-gray-500 text-sm font-medium">
            {t("totalComplaints")}
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalComplaints}
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-gray-500 text-sm font-medium">
            {t("resolvedComplaints")}
          </h3>
          <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-gray-500 text-sm font-medium">
            {t("inProgress")}
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.inProgress}
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-gray-500 text-sm font-medium">
            {t("departments")}
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.departments}
          </p>
        </Motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-4">
            {t("complaintsByMonth")}
          </h3>
          <ComplaintChart />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-4">{t("byDepartment")}</h3>
          <DepartmentStats />
        </Motion.div>
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-4">{t("recentActivity")}</h3>
        <RecentActivity />
      </Motion.div>
    </div>
  );
};
export default AdminDashboardComponent;
