"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { Motion } from "../animations/MotionWrapper";

interface TimelineEvent {
  id: string;
  status: string;
  description: string;
  createdAt: string;
}

interface ComplaintTimelineProps {
  complaintId: string;
}

export default function ComplaintTimeline({
  complaintId,
}: ComplaintTimelineProps) {
  const t = useTranslations("Complaints");
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`/api/complaints/${complaintId}/timeline`);
        const data = await response.json();
        setTimeline(data);
      } catch (error) {
        console.log("Error fetching timeline:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [complaintId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (timeline.length === 0) {
    return <p className="text-gray-500">{t("noTimelineEvents")}</p>;
  }

  return (
    <div className="space-y-8">
      {timeline.map((event, index) => (
        <Motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
            {index !== timeline.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200"></div>
            )}
          </div>

          <div className="flex-1 pb-8">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">{t(`status.${event.status}`)}</h3>
              <span className="text-sm text-gray-500">
                {format(new Date(event.createdAt), "MMM d, yyyy h:mm a")}
              </span>
            </div>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </Motion.div>
      ))}
    </div>
  );
}
