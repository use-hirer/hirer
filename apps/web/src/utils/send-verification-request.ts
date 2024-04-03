import { resend } from "@hirer/email/resend";
import MagicLinkEmail from "@hirer/email/templates/magic-link";

interface sendVerificationProps {
  email: string;
  url: string;
}

export const sendVerificationRequest = async ({
  email,
  url,
}: sendVerificationProps) => {
  const { host } = new URL(url);

  try {
    if (process.env.NODE_ENV === "development") {
      console.log(`Login link: ${url}`);
      return;
    } else {
      await resend.emails.send({
        from: "Hirer <team@updates.hirer.so>",
        to: email,
        subject: `Your Hirer Login Link`,
        text: text(url, host),
        react: MagicLinkEmail({ email: email, loginLink: url }),
      });
    }
  } catch (error) {
    throw new Error("Failed to send the verification Email.");
  }
};

function text(url: string, host: string) {
  return `Sign in to ${host}\n${url}\n\n`;
}
