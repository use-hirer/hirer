import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/((?!favicon.ico|hirer-icon.png|sign-up|dashboard-snip.png).*)"],
};
