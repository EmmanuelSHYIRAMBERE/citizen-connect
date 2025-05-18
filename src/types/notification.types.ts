export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  relatedTo: "complaint" | "system" | "account";
  relatedId?: string; // ID of related entity
  isRead: boolean;
  createdAt: Date;
}

export interface NotificationInput {
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  relatedTo: "complaint" | "system" | "account";
  relatedId?: string; // ID of related entity
}
