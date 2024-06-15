import { resend } from "@hirer/email/resend";
import ApplicationReceivedCandidate from "@hirer/email/templates/application-received-candidate";

interface sendVerificationProps {
  email: string;
  url: string;
  orgName: string;
  orgLogo?: string;
  candidateName: string;
  jobTitle: string;
  jobLink: string;
}

export const sendApplicationReceivedCandidate = async ({
  email,
  url,
  orgName,
  orgLogo,
  candidateName,
  jobTitle,
  jobLink,
}: sendVerificationProps) => {
  const { host } = new URL(url);

  try {
    await resend.emails.send({
      from: `${orgName} <applications@updates.hirer.so>`,
      to: email,
      subject: `${orgName} - Application Received (${jobTitle})`,
      text: `You application has been received for ${jobTitle}.`,
      react: ApplicationReceivedCandidate({
        email: email,
        name: candidateName,
        orgName: orgName,
        orgLogo: orgLogo,
        jobTitle: jobTitle,
        jobLink: jobLink,
      }),
    });
  } catch (error) {
    throw new Error("Failed to send the candidate application received email.");
  }
};
