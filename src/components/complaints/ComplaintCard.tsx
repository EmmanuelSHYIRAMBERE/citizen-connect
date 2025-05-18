"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import ComplaintStatus from "./ComplaintStatus";
import { Complaint } from "@/types/complaint.types";
import { Motion } from "../animations/MotionWrapper";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
    },
  },
};

export function ComplaintCard({
  complaint,
  index,
}: {
  complaint: Complaint;
  index: number;
}) {
  const t = useTranslations("Complaints");

  return (
    <Motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
    >
      <Link href={`/complaints/${complaint.id}`} className="block p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {complaint.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {complaint.description}
            </p>
          </div>
          <ComplaintStatus status={complaint.status} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {t("category")}: {t(`categories.${complaint.category}`)}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>
      </Link>
    </Motion.div>
  );
}
