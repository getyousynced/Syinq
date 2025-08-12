import { DefaultSession } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName?: string | null;
      role?: Role | null;
      suspended?: boolean | null;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    userName?: string | null;
    role?: Role | null;
    suspended?: boolean | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    userName?: string | null;
    role?: Role | null;
    suspended?: boolean | null;
    profileImage?: string | null;
  }
}
