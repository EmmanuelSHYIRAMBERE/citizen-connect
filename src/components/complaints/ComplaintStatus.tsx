"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function ComplaintStatus({ status }: { status: string }) {
  const t = useTranslations("Complaints.status");

  const statusClasses = {
    SUBMITTED: "bg-blue-100 text-blue-800",
    IN_REVIEW: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    RESOLVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={cn(statusClasses[status as keyof typeof statusClasses])}>
      {t(status as keyof typeof t)}
    </Badge>
  );
}
