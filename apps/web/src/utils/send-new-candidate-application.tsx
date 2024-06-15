import { resend } from "@hirer/email/resend";
import ApplicationReceivedOrg from "@hirer/email/templates/application-received-org";

interface sendVerificationProps {
  email: string;
  jobTitle: string;
  candidateLink: string;
  candidateName: string;
  orgName: string;
}

export const sendVerificationRequest = async ({
  email,
  jobTitle,
  candidateLink,
  candidateName,
  orgName,
}: sendVerificationProps) => {
  try {
    await resend.emails.send({
      from: "Hirer <team@updates.hirer.so>",
      to: email,
      subject: `New Candidate Application Received (${candidateName})`,
      text: `New candidate application received for ${candidateName}.`,
      react: ApplicationReceivedOrg({
        candidateName: candidateName,
        jobTitle: jobTitle,
        candidateLink: candidateLink,
        orgName: orgName,
      }),
    });
  } catch (error) {
    throw new Error("Failed to send the application received (org) email.");
  }
};
