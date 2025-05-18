"use client";

import { useTranslations } from "next-intl";
import { ComplaintCard } from "@/components/complaints/ComplaintCard";
import { useEffect, useState } from "react";
import StatsCard from "@/components/data-viz/StatsCard";
import AnimatedProgress from "@/components/animations/AnimatedProgress";
import { Complaint } from "@/types/complaint.types";
import Link from "next/link";
import { Button } from "../ui/button";
import { Motion } from "../animations/MotionWrapper";

const CitizenDashboardComponent = () => {
  const t = useTranslations("Citizen");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState({
    submitted: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, statsRes] = await Promise.all([
          fetch("/api/complaints?limit=3"),
          fetch("/api/complaints/stats"),
        ]);

        const complaintsData = await complaintsRes.json();
        const statsData = await statsRes.json();

        setComplaints(complaintsData);
        setStats(statsData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCard
            title={t("stats.submitted")}
            value={stats.submitted}
            icon="📝"
          />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCard
            title={t("stats.inProgress")}
            value={stats.inProgress}
            icon="🔄"
          />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatsCard
            title={t("stats.resolved")}
            value={stats.resolved}
            icon="✅"
          />
        </Motion.div>
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <AnimatedProgress
          value={(stats.resolved / Math.max(1, stats.submitted)) * 100}
        />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t("recentComplaints")}</h2>
          <Link
            href="/citizen/complaints"
            className="text-blue-600 hover:underline"
          >
            {t("viewAll")}
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : complaints.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {complaints.map((complaint, index) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t("noComplaints")}</p>
        )}
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">{t("quickActions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/complaints/new">
            <Button className="w-full" variant="outline">
              {t("submitNewComplaint")}
            </Button>
          </Link>
          <Link href="/citizen/profile">
            <Button className="w-full" variant="outline">
              {t("updateProfile")}
            </Button>
          </Link>
        </div>
      </Motion.div>
    </div>
  );
};

export default CitizenDashboardComponent;
