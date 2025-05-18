"use client";

import { useTranslations } from "next-intl";
import { ComplaintCard } from "./ComplaintCard";
import { Complaint, ComplaintStatus } from "@/types/complaint.types";

const ComplaintList = () => {
  const t = useTranslations("Complaints");

  // Mock data - replace with real data fetching
  const complaints: Complaint[] = [
    {
      id: "1",
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues",
      category: "infrastructure",
      status: ComplaintStatus.IN_PROGRESS,
      createdAt: new Date("2023-11-01"),
    },
    {
      id: "2",
      title: "Garbage not collected",
      description: "Garbage has not been collected for 3 days",
      category: "sanitation",
      status: ComplaintStatus.UNDER_REVIEW,
      createdAt: new Date("2023-11-05"),
    },
    {
      id: "3",
      title: "Broken street light",
      description: "Street light not working on corner of 5th and Elm",
      category: "infrastructure",
      status: ComplaintStatus.RESOLVED,
      createdAt: new Date("2023-10-28"),
    },
  ];

  if (complaints.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">{t("noComplaints")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint, index) => (
        <ComplaintCard key={complaint.id} index={index} complaint={complaint} />
      ))}
    </div>
  );
};

export default ComplaintList;
