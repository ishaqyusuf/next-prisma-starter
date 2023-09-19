 
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, PrismaClient,  Users } from "@prisma/client";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; 
import { loginAction } from "@/app/_actions/auth/login";

const prisma = new PrismaClient();
declare module "next-auth" {
  interface User {
    user: Users; 
  }

  interface Session extends DefaultSession {
    // user: {
    user: Users; 
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: Users; 
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: '/signin?error=login+failed',
    
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60,
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, user: cred }) => {
            console.log("CRED")
      console.log(token?.jti)
      // console.log(cred)
      if (cred) {
        const {  user } = cred;
        token.user = user;
        
      }
      return token;
    },
    session({ session, user, token }) {
      console.log("Session");

      if (session.user) {
        session.user = token.user;
       
      }
            return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
         
        if(!credentials)
        {
          return null;
        } 
        const login = await loginAction(credentials);
        return login
      },
    }),
  ],
};

