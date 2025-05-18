"use server";

import { pusherServer } from "@/lib/pusher";
import prisma from "../../prisma/client";
import { NotificationType } from "@prisma/client";

export const createNotification = async (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  referenceId?: string
) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        referenceId,
      },
    });

    // Trigger real-time notification
    await pusherServer.trigger(
      `notifications-${userId}`,
      "new-notification",
      notification
    );

    return { success: true, notification };
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false, error: "Failed to create notification" };
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false, error: "Failed to mark notification as read" };
  }
};

export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { success: true };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return { success: false, error: "Failed to mark notifications as read" };
  }
};
