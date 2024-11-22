// app/layout.tsx
'use client';

// import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import Footer from "./components/Footer";
import ToasterProvider from "./providers/ToasterProvider";
import Provider from "./components/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Sync",
//   description: "Connecting dots...",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const routesWithoutNavbar = ['/404', '/error', '/_error', '/500', '/about', '/blog', '/contact-us'];
  const shouldShowNavigation = !routesWithoutNavbar.includes(pathname || '');

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <ToasterProvider />
          {shouldShowNavigation && <Sidebar />}
          {shouldShowNavigation && <Navbar />}
          <Provider>
            {children}
          </Provider>
          {shouldShowNavigation && <Footer />}
        </SidebarProvider>
      </body>
    </html>
  );
}