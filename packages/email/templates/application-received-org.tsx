import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ApplicationReceivedProps {
  candidateName: string;
  orgName: string;
  jobTitle: string;
  candidateLink: string;
}

export const ApplicationReceivedOrg = ({
  orgName = "ACME Inc",
  candidateName = "Nick Mandylas",
  jobTitle = "Frontend Engineer",
  candidateLink = "https://console.hirer.so",
}: ApplicationReceivedProps) => {
  const previewText = `Application for ${jobTitle} at ${orgName} received!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://hirer.so/hirer-icon.png`}
                width="50"
                height="50"
                alt="Hirer"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              New Candidate Application
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              You've received a new candidate application ({candidateName}) for{" "}
              {jobTitle}.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You can view the candidate's info & resume evaluation here,{" "}
              <Link href={candidateLink} className="text-blue-600 no-underline">
                {candidateLink}
              </Link>
              .
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Have a lovely day 👋
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ApplicationReceivedOrg;
