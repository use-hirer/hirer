import {
  Body,
  Button,
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

interface LoginMagicLinkProps {
  email: string;
  loginLink: string;
}

export const MagicLink = ({
  email = "test@email.com",
  loginLink = "https://console.hirer.so/",
}: LoginMagicLinkProps) => {
  const previewText = `Your Hirer Login Link`;
  let baseUrl: string;

  try {
    const url = new URL(loginLink);
    baseUrl = url.host;
  } catch {
    baseUrl = "https://console.hirer.so";
  }

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/hirer-icon.png`}
                width="50"
                height="50"
                alt="Hirer"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Your <strong>Hirer</strong> Login Link
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hey there!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Please click the magic link below to sign in to your account.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                href={loginLink}
                className="bg-brand px-3 py-2 font-normal leading-4 text-white bg-black rounded-md text-sm"
              >
                Sign In
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={loginLink} className="text-blue-600 no-underline">
                {loginLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">{email} </span>. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your account&apos;s safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLink;
