"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AgencyTable = () => {
  const t = useTranslations("Admin.Departments");

  // Mock data - replace with real data fetching
  const agencies = [
    { id: "1", name: "Public Works", complaints: 42, employees: 15 },
    { id: "2", name: "Sanitation", complaints: 28, employees: 12 },
    { id: "3", name: "Transportation", complaints: 35, employees: 18 },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("title")}</TableHead>
            <TableHead>{t("Complaints.title")}</TableHead>
            <TableHead>{t("Users.title")}</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agencies.map((agency) => (
            <TableRow key={agency.id}>
              <TableCell className="font-medium">{agency.name}</TableCell>
              <TableCell>{agency.complaints}</TableCell>
              <TableCell>{agency.employees}</TableCell>
              <TableCell className="text-right">
                <button className="text-primary hover:underline">
                  {t("refresh")}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgencyTable;
