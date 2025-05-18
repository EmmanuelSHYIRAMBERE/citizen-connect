import ClientRootLayout from "@/app/ClientRootLayout";
import Chatbot from "@/components/chatbot/Chatbot";
import HydrationFix from "@/components/HydrationFix";
import { CitizenHeader } from "@/components/layout/CitizenHeader";
import CitizenSidebar from "@/components/layout/CitizenSidebar";
import { ToastProvider } from "@/components/toast-provider";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientRootLayout>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <CitizenSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <CitizenHeader />
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
