"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/85 backdrop-blur p-4">
      <div className="flex justify-start items-center gap-4 lg:pl-[8vw]">
        <Link href="/admin">
        <div className="flex items-end gap-2 font-extrabold tracking-tight ">
          <Image
          src="/logo.png"
          alt="SYINQ logo"
          width={95}
          height={95}
          priority
          />
          <span className="hidden sm:block text-gray-400 font-semibold">Admin</span>
        </div>
        </Link>
        {/* <div className="flex-1" /> */}
        
        {/* <nav className="flex items-center gap-2">
          <Link className="btn border border-primary text-primary hover:bg-blue-50" href="/admin/[slug]/login" as="/admin/access/login">Login</Link>
          <Link className="btn bg-primary hover:bg-blue-400 text-white" href="/admin/dashboard">Dashboard</Link>
        </nav> */}
      </div>
    </header>
  );
}
