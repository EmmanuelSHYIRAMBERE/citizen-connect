import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen px-2 md:px-4">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
