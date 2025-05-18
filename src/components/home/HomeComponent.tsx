"use client";

import { useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
import { ComplaintCard } from "@/components/complaints/ComplaintCard";
import { ComplaintStatus } from "@/types/complaint.types";
import AnimatedStats from "../data-viz/AnimatedStats";
import { Motion } from "../animations/MotionWrapper";

const HomeComponent = () => {
  const t = useTranslations("Home");

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed";
  });

  // Mock data for recent complaints
  const recentComplaints = [
    {
      id: "1",
      title: "Pothole on Main Street",
      description:
        "Large pothole causing traffic issues near the intersection with 5th Avenue",
      category: "infrastructure",
      status: ComplaintStatus.IN_PROGRESS,
      createdAt: new Date("2023-05-15"),
    },
    {
      id: "2",
      title: "Garbage collection missed",
      description:
        "Our street was skipped during the weekly garbage collection",
      category: "sanitation",
      status: ComplaintStatus.UNDER_REVIEW,
      createdAt: new Date("2023-05-14"),
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section with Parallax */}
      <Motion.section
        style={{ opacity, scale, position }}
        className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow shadow-black rounded-lg overflow-hidden m-2"
        ref={targetRef}
      >
        <div className="container mx-auto px-6 text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t("welcome")}
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            {t("description")}
          </Motion.p>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/complaints/new"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {t("submitComplaint")}
            </Link>
          </Motion.div>
        </div>
      </Motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimatedStats
            stats={[
              { value: 1245, label: t("stats.complaints") },
              { value: 892, label: t("stats.resolved") },
              { value: 15, label: t("stats.departments") },
            ]}
          />
        </div>
      </section>

      {/* Recent Complaints Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("recentComplaints")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentComplaints.map((complaint, index) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                index={index}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/complaints"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {t("viewAll")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomeComponent;
