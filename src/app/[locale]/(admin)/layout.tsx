import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";
import Chatbot from "@/components/chatbot/Chatbot";
import ClientRootLayout from "@/app/ClientRootLayout";
import { ToastProvider } from "@/components/toast-provider";
import HydrationFix from "@/components/HydrationFix";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientRootLayout>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4">
            <ToastProvider>
              <HydrationFix>{children}</HydrationFix>
            </ToastProvider>
          </main>
          <Chatbot />
        </div>
      </div>
    </ClientRootLayout>
  );
}
