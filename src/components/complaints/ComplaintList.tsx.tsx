"use client";

import { useTranslations } from "next-intl";
import {
  Complaint,
  ComplaintStatus,
  NewComplaintData,
} from "@/types/complaint.types";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ComplaintForm from "./ComplaintForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Filter, X } from "lucide-react";
import { useToast } from "../toast-provider";
import ComplaintCard from "./ComplaintCard";

const ComplaintList = () => {
  const t = useTranslations("Complaints");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const toast = useToast();

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      let url = "/api/complaints";
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (categoryFilter !== "all") params.append("category", categoryFilter);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setComplaints(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch complaints");
      }
    } catch (error) {
      toast.toast({
        type: "error",
        message: error instanceof Error ? error.message : t("fetchError"),
      });
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, categoryFilter, toast, t]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleCreateComplaint = async (newComplaint: NewComplaintData) => {
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComplaint),
      });

      if (response.ok) {
        toast.toast({
          type: "success",
          message: t("complaintCreated"),
        });
        fetchComplaints();
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create complaint");
      }
    } catch (error) {
      toast.toast({
        type: "error",
        message: error instanceof Error ? error.message : t("createError"),
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const statusOptions = [
    { value: "all", label: t("allStatuses") },
    { value: ComplaintStatus.SUBMITTED, label: t("status.SUBMITTED") },
    { value: ComplaintStatus.IN_PROGRESS, label: t("status.IN_PROGRESS") },
    { value: ComplaintStatus.UNDER_REVIEW, label: t("status.UNDER_REVIEW") },
    { value: ComplaintStatus.RESOLVED, label: t("status.RESOLVED") },
  ];

  const categoryOptions = [
    { value: "all", label: t("allCategories") },
    { value: "infrastructure", label: t("categories.infrastructure") },
    { value: "sanitation", label: t("categories.sanitation") },
    { value: "transportation", label: t("categories.transportation") },
    { value: "safety", label: t("categories.safety") },
    { value: "noise", label: t("categories.noise") },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full md:w-auto">
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as ComplaintStatus | "all")
            }
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder={t("filterByStatus")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder={t("filterByCategory")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchTerm ||
            statusFilter !== "all" ||
            categoryFilter !== "all") && (
            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              {t("clearFilters")}
            </Button>
          )}

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap">
                {t("submitComplaint")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t("submitComplaint")}</DialogTitle>
              </DialogHeader>
              <ComplaintForm
                onSubmit={handleCreateComplaint}
                onCancel={() => setIsModalOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={fetchComplaints}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {complaints.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            {t("noComplaintsFound")}
          </p>
          {(searchTerm ||
            statusFilter !== "all" ||
            categoryFilter !== "all") && (
            <Button variant="link" onClick={clearFilters}>
              {t("clearFiltersToSeeAll")}
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint, index) => (
            <ComplaintCard
              key={complaint.id}
              index={index}
              complaint={complaint}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
