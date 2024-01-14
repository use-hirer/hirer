import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
});

export const config = {
  matcher: [
    "/((?!favicon.ico|hirer-icon.png|sign-up|dashboard-snip.png|verify-request).*)",
  ],
};
