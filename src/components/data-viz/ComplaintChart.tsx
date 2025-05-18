"use client";

import { useTranslations } from "next-intl";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect, useState } from "react";
import { Motion } from "../animations/MotionWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComplaintData {
  month: string;
  total: number;
  resolved: number;
}

const ComplaintChart = () => {
  const t = useTranslations("Admin");
  const [data, setData] = useState<ComplaintData[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchData = async () => {
      const mockData: ComplaintData[] = [
        { month: "Jan", total: 45, resolved: 25 },
        { month: "Feb", total: 60, resolved: 40 },
        { month: "Mar", total: 75, resolved: 50 },
        { month: "Apr", total: 80, resolved: 60 },
        { month: "May", total: 90, resolved: 70 },
        { month: "Jun", total: 110, resolved: 85 },
      ];
      setData(mockData);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: t("totalComplaints"),
        data: data.map((item) => item.total),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 4,
      },
      {
        label: t("resolvedComplaints"),
        data: data.map((item) => item.resolved),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Bar options={options} data={chartData} />
    </Motion.div>
  );
};

export default ComplaintChart;
