import Chatbot from "@/components/chatbot/Chatbot";
import { AgencyHeader } from "@/components/layout/AgencyHeader";
import AgencySidebar from "@/components/layout/AgencySidebar";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AgencySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AgencyHeader />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
        <Chatbot />
      </div>
    </div>
  );
}
