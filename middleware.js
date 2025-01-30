// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to "/" if unauthenticated
  },
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("Middleware Running: ", req.nextUrl.pathname);
      console.log("User Token: ", token);

      // Allow users to access signup page freely
      if (req.nextUrl.pathname === "/signup") {
        return true;
      }

      return !!token; // Only allow authenticated users
    },
  },
});

export const config = {
  matcher: ["/home/:path*" ,"/private_feed/:path*", "/profile/:path*", "/search/:path*"], // Protect these routes
};
