import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "../../db/queries";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials:", credentials);
        const user = await findUserByEmail(credentials.email);
        if(user.user_password === credentials.password) {
          return user;
        } else {
          return null;
        }
        
      },
    }),
  ],
  session: {
    strategy: "jwt", // Make sure session is JWT-based
    maxAge: 30 * 60, // Set session expiration time (e.g., 30 minutes)
    updateAge: 15 * 60, // Refresh session every 15 minutes
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };