"use client";

import { Complaint } from "@/types/complaint.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";
import { Eye, MessageSquare, ThumbsUp } from "lucide-react";
import ComplaintDetailsComponent from "../home/ComplaintDetailsComponent";

interface ComplaintCardProps {
  complaint: Complaint;
  index: number;
}

const ComplaintCard = ({ complaint }: ComplaintCardProps) => {
  const t = useTranslations("Complaints");

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{complaint.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {complaint.description}
          </p>
        </div>
        <Badge className={` capitalize`}>
          {t(`status.${complaint.status}`)}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline">{complaint.category}</Badge>
        {complaint.tags?.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {formatDate(complaint.createdAt)}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {complaint.upvoteCount || 0}
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            {complaint.updates?.length || 0}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                {t("viewDetails")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>{complaint.title}</DialogTitle>
              </DialogHeader>
              <ComplaintDetailsComponent id={complaint.id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
