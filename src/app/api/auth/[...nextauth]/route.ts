import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create new user
            existingUser = await prisma.user.create({
              data: {
                email: user.email!,
                googleId: account.providerAccountId,
                profileImage: user.image,
                role: Role.Student,
                userName: "",
                phoneNumber: "",
              },
            });
          }

          // Check if user is suspended
          if (existingUser.suspended) {
            return false;
          }

          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in - fetch user data from database
      if (account && user) {
        const userData = await prisma.user.findUnique({
          where: { email: user.email! },
          select: {
            id: true,
            userName: true,
            email: true,
            role: true,
            profileImage: true,
            suspended: true,
          },
        });

        if (userData) {
          token.userId = userData.id;
          token.userName = userData.userName;
          token.role = userData.role;
          token.suspended = userData.suspended;
          token.profileImage = userData.profileImage;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.user.userName = token.userName as string;
        session.user.role = token.role as Role;
        session.user.suspended = token.suspended as boolean;
        session.user.image = token.profileImage as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
