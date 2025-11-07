"use client"
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <>
    <div className="min-h-screen text-foreground">
      { path== "/admin"?<div></div >:
      <Header />}
      {children}
    </div>
     <Footer/>
    </>
  );
}
