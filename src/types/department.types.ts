export interface Department {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  parentDepartmentId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentInput {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  parentDepartmentId?: string;
}
