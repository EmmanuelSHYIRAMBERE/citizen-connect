import { z } from "zod";

export const complaintSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(5000),
  category: z.string().min(1),
  subCategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z
    .enum(["SUBMITTED", "IN_REVIEW", "IN_PROGRESS", "RESOLVED", "REJECTED"])
    .optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  isAnonymous: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  departmentId: z.string().optional(),
  agencyId: z.string().optional(),
  assignedToId: z.string().optional(),
  citizenId: z.string().optional(),
  citizenName: z.string().optional(),
  citizenContact: z.string().optional(),
  contactPreference: z.enum(["email", "sms", "both"]).optional(),
  dueDate: z.string().datetime().optional(),
  location: z
    .object({
      address: z.string().optional(),
      district: z.string().optional(),
      sector: z.string().optional(),
      cell: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  resolutionSummary: z.string().optional(),
  citizenSatisfactionRating: z.number().min(1).max(5).optional(),
  feedbackComment: z.string().optional(),
});

export type ComplaintInput = z.infer<typeof complaintSchema>;
