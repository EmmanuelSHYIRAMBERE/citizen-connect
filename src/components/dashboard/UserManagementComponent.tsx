"use client";

import { useTranslations } from "next-intl";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Motion } from "../animations/MotionWrapper";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagementComponent = () => {
  const t = useTranslations("Admin.Users");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let url = "/api/users?";
        if (searchTerm) url += `search=${searchTerm}&`;
        if (roleFilter !== "all") url += `role=${roleFilter}&`;

        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, roleFilter]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "role",
      header: t("role"),
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
        <Link href="/admin/users/new">
          <Button>{t("addNew")}</Button>
        </Link>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="md:col-span-2">
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("filterByRole")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allRoles")}</SelectItem>
            <SelectItem value="CITIZEN">{t("roles.citizen")}</SelectItem>
            <SelectItem value="AGENCY">{t("roles.agency")}</SelectItem>
            <SelectItem value="ADMIN">{t("roles.admin")}</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          {t("refresh")}
        </Button>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          pagination
        />
      </Motion.div>
    </div>
  );
};

export default UserManagementComponent;
