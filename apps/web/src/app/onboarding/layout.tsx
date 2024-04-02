import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  if (user.onboarded) {
    return redirect("/");
  }

  if (user.data && user.data?.userOnboarding !== true) {
    return redirect("/onboarding/company");
  }

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
