"use client";

import { useTranslations } from "next-intl";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Motion } from "../animations/MotionWrapper";

interface Department {
  id: number;
  name: string;
  description: string;
}

const DepartmentManagementComponent = () => {
  const t = useTranslations("Admin.Departments");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const url = searchTerm
          ? `/api/departments?search=${searchTerm}`
          : "/api/departments";

        const response = await fetch(url);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.log("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [searchTerm]);

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "description",
      header: t("description"),
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
        <Link href="/admin/departments/new">
          <Button>{t("addNew")}</Button>
        </Link>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-6"
      >
        <Input
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
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
          data={departments}
          loading={loading}
          pagination
        />
      </Motion.div>
    </div>
  );
};
export default DepartmentManagementComponent;
