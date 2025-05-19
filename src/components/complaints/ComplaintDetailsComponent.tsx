"use client";

import { Complaint } from "@/types/complaint.types";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";
import ComplaintTimeline from "./ComplaintTimeline";
import { MapPin } from "lucide-react";

interface ComplaintDetailsProps {
  complaint: Complaint;
}

const ComplaintDetails = ({ complaint }: ComplaintDetailsProps) => {
  const t = useTranslations("Complaints");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              {t("description")}
            </h4>
            <p className="mt-1">{complaint.description}</p>
          </div>

          {complaint.resolutionSummary && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {t("resolution")}
              </h4>
              <p className="mt-1">{complaint.resolutionSummary}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">{t("status")}</h4>
            <Badge className={`mt-1  capitalize`}>
              {t(`status.${complaint.status}`)}
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">
              {t("submittedOn")}
            </h4>
            <p className="mt-1">{formatDate(complaint.createdAt)}</p>
          </div>

          {complaint.resolvedAt && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {t("resolvedOn")}
              </h4>
              <p className="mt-1">{formatDate(complaint.resolvedAt)}</p>
            </div>
          )}

          {complaint.location && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {t("location")}
              </h4>
              <div className="mt-1 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {[
                    complaint.location.address,
                    complaint.location.sector,
                    complaint.location.district,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          {t("timeline")}
        </h4>
        <ComplaintTimeline complaintId={complaint.id} />
      </div>
    </div>
  );
};

export default ComplaintDetails;
