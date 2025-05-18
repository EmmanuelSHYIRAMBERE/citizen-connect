export interface Agency {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  logoUrl?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
