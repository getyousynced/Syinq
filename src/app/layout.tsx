import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const roboto = Roboto({
  weight: "400",
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sync",
  description: "Connecting dots...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${roboto.className} select-none`}>
        <Navbar user={user} />
        {children}
        <Toaster />
        <Sonner />
        <Footer />
      </body>
    </html>
  );
}