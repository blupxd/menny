import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Split the full name into first name and last name
        const [firstName, ...lastName] = profile.name?.split(" ") || [];
        return {
          id: profile.sub,
          email: profile.email,
          name: firstName || profile.name,
          lastname: lastName.join(" ") || "",
          image: profile.picture,
          provider: "google"
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          return null;
        }
        if (!existingUser.password) return null;
        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) {
            return null;
          }
        }
        return {
          id: existingUser.id + "",
          email: existingUser.email + "",
          name: existingUser.name + "",
          lastname: existingUser.lastname + "",
          provider: "credentials"
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          provider: user.provider
        };
      }
      if (trigger === "update" && session) {
        console.log(session);
        token.name = session.name;
        token.lastname = session.lastname;
        token.email = session.email;
        token.picture = session.image;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          lastname: token.lastname,
          email: token.email,
          provider: token.provider
        },
      };
    },
  },
};
