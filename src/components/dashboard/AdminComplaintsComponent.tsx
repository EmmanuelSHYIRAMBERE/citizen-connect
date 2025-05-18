"use client";

import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { Complaint } from "@/types/complaint.types";
import { Motion } from "../animations/MotionWrapper";

const AdminComplaintsComponent = () => {
  const t = useTranslations("Admin.Complaints");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        let url = "/api/complaints?";
        if (searchTerm) url += `search=${searchTerm}&`;
        if (statusFilter !== "all") url += `status=${statusFilter}&`;
        if (categoryFilter !== "all") url += `category=${categoryFilter}&`;

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
  }, [searchTerm, statusFilter, categoryFilter]);

  const columns: ColumnDef<Complaint>[] = [
    {
      accessorKey: "id",
      header: t("id"),
    },
    {
      accessorKey: "title",
      header: t("title"),
    },
    {
      accessorKey: "category",
      header: t("category"),
    },
    {
      accessorKey: "status",
      header: t("status"),
    },
  ];

  return (
    <div className="p-6">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Link href="/admin/complaints/new">
          <Button>{t("addNew")}</Button>
        </Link>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <Input
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("filterByStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="SUBMITTED">{t("status.submitted")}</SelectItem>
            <SelectItem value="IN_REVIEW">{t("status.inReview")}</SelectItem>
            <SelectItem value="IN_PROGRESS">
              {t("status.inProgress")}
            </SelectItem>
            <SelectItem value="RESOLVED">{t("status.resolved")}</SelectItem>
            <SelectItem value="REJECTED">{t("status.rejected")}</SelectItem>
          </SelectContent>
        </Select>

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
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            {t("refresh")}
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={complaints}
          loading={loading}
          pagination
        />
      </Motion.div>
    </div>
  );
};

export default AdminComplaintsComponent;
