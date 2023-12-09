import MagicLinkEmail from "@/emails/magic-link";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { resend } from "../lib/resend";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  try {
    if (process.env.NODE_ENV === "development") {
      console.log(`Login link: ${url}`);
      return;
    } else {
      await resend.emails.send({
        from: "team@updates.usehirer.com",
        to: identifier,
        subject: `Your Hirer Login Link`,
        text: text(url, host),
        react: MagicLinkEmail({ email: identifier, loginLink: url }),
      });
    }
  } catch (error) {
    throw new Error("Failed to send the verification Email.");
  }
};

function text(url: string, host: string) {
  return `Sign in to ${host}\n${url}\n\n`;
}
