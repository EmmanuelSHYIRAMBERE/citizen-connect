"use client";

import { useTranslations } from "next-intl";
import { ComplaintCard } from "@/components/complaints/ComplaintCard";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/types/complaint.types";
import { LoadingSkeleton } from "../ui/system-skeletons";
import { Motion } from "../animations/MotionWrapper";

const PublicComplaintsComponent = () => {
  const t = useTranslations("Complaints");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchComplaints = async () => {
      try {
        let url = "/api/complaints/public?";
        if (searchTerm) url += `search=${searchTerm}&`;
        if (categoryFilter !== "all") url += `category=${categoryFilter}&`;
        if (statusFilter !== "all") url += `status=${statusFilter}&`;

        const response = await fetch(url);
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.log("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [searchTerm, categoryFilter, statusFilter]);

  if (!isClient) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">{t("publicDashboard")}</h1>
        <p className="text-gray-600">{t("publicDashboardDescription")}</p>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="md:col-span-2">
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t("filterByCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCategories")}</SelectItem>
              <SelectItem value="infrastructure">
                {t("categories.infrastructure")}
              </SelectItem>
              <SelectItem value="sanitation">
                {t("categories.sanitation")}
              </SelectItem>
              <SelectItem value="transportation">
                {t("categories.transportation")}
              </SelectItem>
              <SelectItem value="safety">{t("categories.safety")}</SelectItem>
              <SelectItem value="noise">{t("categories.noise")}</SelectItem>
              <SelectItem value="other">{t("categories.other")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t("filterByStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStatuses")}</SelectItem>
              <SelectItem value="SUBMITTED">{t("status.SUBMITTED")}</SelectItem>
              <SelectItem value="IN_PROGRESS">
                {t("status.IN_PROGRESS")}
              </SelectItem>
              <SelectItem value="RESOLVED">{t("status.RESOLVED")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : complaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((complaint, index) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t("noComplaintsFound")}</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}
            >
              {t("resetFilters")}
            </Button>
          </div>
        )}
      </Motion.div>
    </div>
  );
};

export default PublicComplaintsComponent;
