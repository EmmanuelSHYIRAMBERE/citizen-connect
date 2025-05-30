export interface User {
  id: string;
  email: string;
  name: string;
  role: "CITIZEN" | "AGENCY" | "ADMIN";
  phone?: string;
  nationalId?: string; // For Rwanda context
  address?: string;
  department?: string;
  position?: string; // For agency staff
  passwordHash: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  preferredLanguage: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
}
