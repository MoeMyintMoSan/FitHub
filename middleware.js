// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to the sign-in page if unauthenticated
  },
});

export const config = {
  matcher: ["/home/:path*", "/private_feed/:path*", "/profile/:path*"], // Protect these routes
};
