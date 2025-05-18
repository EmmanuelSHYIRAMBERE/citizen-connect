import type { Metadata } from "next";
import "./auth.css";
import { ToastProvider } from "@/components/toast-provider";
import HydrationFix from "@/components/HydrationFix";

export const metadata: Metadata = {
  title: "Wedding Vendor Marketplace | Authentication",
  description: "Join our marketplace to find the perfect wedding vendors",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50  overflow-hidden">
          <ToastProvider>
            <HydrationFix>{children}</HydrationFix>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
