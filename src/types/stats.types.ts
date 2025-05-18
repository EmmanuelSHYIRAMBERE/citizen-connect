export interface Stats {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  avgResolutionTime: number; // in days
  satisfactionRate: number; // percentage
  complaintsByCategory: Record<string, number>;
  complaintsByStatus: Record<string, number>;
  complaintsByDepartment: Record<string, number>;
  complaintsTrend: Array<{
    date: string;
    count: number;
  }>;
}
