"use client";

import { useTranslations } from "next-intl";
import { Complaint, ComplaintStatus } from "@/types/complaint.types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Motion } from "../animations/MotionWrapper";

const RecentActivity = () => {
  const t = useTranslations("Admin");
  const [activities, setActivities] = useState<Complaint[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: Complaint[] = [
      {
        id: "1",
        title: "Pothole on Main Street",
        description: "Large pothole causing traffic issues",
        category: "Road Maintenance",
        status: ComplaintStatus.IN_PROGRESS,
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Street Light Outage",
        description: "Light not working on 5th Avenue",
        category: "Utilities",
        status: ComplaintStatus.IN_PROGRESS,
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000),
      },
      {
        id: "3",
        title: "Garbage Collection Missed",
        description: "Garbage not collected in Sector 2",
        category: "Sanitation",
        status: ComplaintStatus.REJECTED,
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 172800000),
      },
    ];
    setActivities(mockData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      {activities.map((activity) => (
        <Motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.category}</p>
            </div>
            <Badge className={getStatusColor(activity.status)}>
              {t(`status.${activity.status}`)}
            </Badge>
          </div>
          <p className="text-sm mt-2 text-gray-500">{activity.description}</p>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>
              {t("created")}: {format(new Date(activity.createdAt), "PPpp")}
            </span>
            <span>
              {t("updated")}:{" "}
              {activity.updatedAt
                ? format(new Date(activity.updatedAt), "PPpp")
                : t("notUpdated")}
            </span>
          </div>
        </Motion.div>
      ))}
    </Motion.div>
  );
};

export default RecentActivity;
