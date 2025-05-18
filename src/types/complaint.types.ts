// Types for the complaint system

import { LocationData } from "./location.types";

// Complaint status options
export enum ComplaintStatus {
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  IN_PROGRESS = "IN_PROGRESS",
  NEEDS_INFO = "NEEDS_INFO",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
  ESCALATED = "ESCALATED",
}

// Complaint priority levels
export enum ComplaintPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

// Attachments (images, documents)
export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: Date;
}

// Data for creating a new complaint
export interface NewComplaintData {
  title: string;
  description: string;
  category: string;
  location?: {
    address: string;
    district: string;
    sector: string;
    cell: string;
  };
  attachments: File[];
}

// Data for a review step
export interface ReviewStepData {
  title: string;
  description: string;
  category: string;
  location?: {
    address: string;
    district: string;
    sector: string;
    cell: string;
  };
}

// Comment or update on a complaint
export interface ComplaintUpdate {
  id: string;
  complaintId: string;
  content: string;
  authorId: string;
  authorType: "citizen" | "agency" | "admin";
  authorName: string;
  isInternal: boolean; // Whether visible to citizens or only to agencies
  attachments?: Attachment[];
  createdAt: Date;
}

// Comprehensive complaint interface
export interface Complaint {
  // Basic identification
  id: string;
  reference?: string; // Human-readable reference code (e.g., "CMP-2025-0001")
  title: string;
  description: string;

  // Classification
  category?: string; // Main category
  subCategory?: string; // Optional subcategory
  tags?: string[]; // Additional tags for filtering

  // Status information
  status: ComplaintStatus;
  priority?: ComplaintPriority;
  isAnonymous?: boolean; // Whether citizen identity is hidden
  isPublic?: boolean; // Whether visible in public listings

  // Assignment
  departmentId?: string; // Assigned government department
  agencyId?: string; // Specific agency if applicable
  assignedToId?: string; // Individual assigned to handle

  // Citizen information
  citizenId?: string;
  citizenName?: string;
  citizenContact?: string; // Email or phone
  contactPreference?: "email" | "sms" | "both";

  // Temporal data
  createdAt: Date;
  updatedAt?: Date;
  dueDate?: Date; // Target resolution date
  resolvedAt?: Date;

  // Location information
  location?: LocationData;

  // Related content
  attachments?: Attachment[];
  updates?: ComplaintUpdate[];

  // Metrics
  viewCount?: number; // How many times viewed
  upvoteCount?: number; // Community support
  similarComplaintsCount?: number; // Related complaints

  // Resolution
  resolutionSummary?: string;
  citizenSatisfactionRating?: number; // 1-5 star rating
  feedbackComment?: string;

  // System fields
  aiCategoryConfidence?: number; // If using AI categorization
  internalNotes?: string; // Admin/agency only notes
  escalationReason?: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: Date;
}
