import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import PublicOnly from "@/components/ClientOnly";
import { ToastProvider } from "@/components/toast-provider";
import ClientRootLayout from "@/app/ClientRootLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ClientRootLayout>
        <PublicOnly>
          <Header />
          <main>
            <ToastProvider>{children}</ToastProvider>
          </main>
          <Footer />
          <Chatbot />
        </PublicOnly>
      </ClientRootLayout>
    </div>
  );
}
