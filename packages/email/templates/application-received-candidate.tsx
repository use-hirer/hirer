import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ApplicationReceivedProps {
  email: string;
  name: string;
  orgName: string;
  orgLogo?: string;
  jobTitle: string;
  jobLink: string;
}

export const ApplicationReceivedCandidate = ({
  email = "test@email.com",
  name = "Nick Mandylas",
  orgName = "ACME Inc",
  orgLogo,
  jobTitle = "Frontend Engineer",
  jobLink = "https://acme-inc.hirer.so",
}: ApplicationReceivedProps) => {
  const previewText = `Thank you for applying to ${orgName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              {orgLogo ? (
                <Img
                  src={orgLogo}
                  width="50"
                  height="50"
                  alt="Hirer"
                  className="my-0 mx-auto"
                />
              ) : (
                <Heading className="text-black text-[22px] font-normal text-center p-0 mx-0">
                  <strong>{orgName}</strong>
                </Heading>
              )}
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              We've received your application!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi {name}!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for applying to {orgName}. We've received your
              application for the position {jobTitle}.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You can view our open job listings here,{" "}
              <Link href={jobLink} className="text-blue-600 no-underline">
                {jobLink}
              </Link>
              .
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{" "}
              <span className="text-black">{email} </span>. If you were not
              expecting this email, please reply to this email to get in touch
              with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ApplicationReceivedCandidate;
