import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';
import TopFooter from "@/components/TopFooter"

const roboto = Roboto({
  weight: "400",
  style: ["italic","normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sync",
  description: "Connecting dots...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} select-none`}>
        <Navbar />
        {children}
        <TopFooter/>
        <Footer />
      </body>
    </html>
  );
}
