import { authOptions } from "@console/lib/auth";
import { getServerSession } from "next-auth";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
