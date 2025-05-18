"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Motion } from "../animations/MotionWrapper";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DepartmentStat {
  name: string;
  count: number;
}

const DepartmentStats = () => {
  const t = useTranslations("Admin");
  const [stats, setStats] = useState<DepartmentStat[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: DepartmentStat[] = [
      { name: t("departments.publicWorks"), count: 45 },
      { name: t("departments.health"), count: 30 },
      { name: t("departments.education"), count: 25 },
      { name: t("departments.transport"), count: 20 },
      { name: t("departments.utilities"), count: 15 },
    ];
    setStats(mockData);
  }, [t]);

  const chartData = {
    labels: stats.map((item) => item.name),
    datasets: [
      {
        data: stats.map((item) => item.count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(244, 63, 94, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
    animation: {
      animateScale: true,
    },
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Doughnut data={chartData} options={options} />
    </Motion.div>
  );
};

export default DepartmentStats;
