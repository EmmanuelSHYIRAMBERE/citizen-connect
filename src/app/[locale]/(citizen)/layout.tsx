import { CitizenHeader } from "@/components/layout/CitizenHeader";
import CitizenSidebar from "@/components/layout/CitizenSidebar";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <CitizenSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CitizenHeader />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
