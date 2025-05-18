"use client";

import { useTranslations } from "next-intl";
import ComplaintTimeline from "@/components/complaints/ComplaintTimeline";
import ComplaintStatus from "@/components/complaints/ComplaintStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "@/components/ui/system-skeletons";
import { Complaint } from "@/types/complaint.types";
import { Motion } from "../animations/MotionWrapper";

type ComplaintDetailsProps = {
  id: string;
};

const ComplaintDetailsComponent = ({ id }: ComplaintDetailsProps) => {
  const t = useTranslations("Complaints");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetch(`/api/complaints/${id}`);
        const data = await response.json();
        setComplaint(data);
      } catch (error) {
        console.log("Error fetching complaint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>{t("complaintNotFound")}</p>
        <Link href="/complaints" className="text-blue-600 hover:underline">
          {t("backToComplaints")}
        </Link>
      </div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="flex justify-between items-start mb-8">
        <Motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-2">{complaint.title}</h1>
          <p className="text-gray-600">
            {t("submittedOn")}{" "}
            {new Date(complaint.createdAt).toLocaleDateString()}
          </p>
        </Motion.div>

        <Motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ComplaintStatus status={complaint.status} />
        </Motion.div>
      </div>

      <Motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">{t("description")}</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {complaint.description}
        </p>

        {complaint.location && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">{t("location")}</h3>
            <div className="h-64 bg-gray-100 rounded-lg">
              {/* Map component would go here */}
              <div className="flex items-center justify-center h-full text-gray-500">
                Map View (Interactive)
              </div>
            </div>
          </div>
        )}
      </Motion.div>

      <Motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">{t("statusTimeline")}</h2>
        <ComplaintTimeline complaintId={complaint.id} />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex justify-end"
      >
        <Link href="/complaints">
          <Button variant="outline" className="mr-4">
            {t("backToComplaints")}
          </Button>
        </Link>
        {complaint.status !== "RESOLVED" && (
          <Button>{t("followComplaint")}</Button>
        )}
      </Motion.div>
    </Motion.div>
  );
};
export default ComplaintDetailsComponent;
