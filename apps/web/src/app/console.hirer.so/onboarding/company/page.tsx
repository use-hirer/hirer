import CompanyProfileForm from "@/components/forms/company-profile-form";
import { AnimatedLogo } from "@/components/logo";
import { validateRequest } from "@/lib/auth";
import { Button } from "@hirer/ui/button";
import { redirect } from "next/navigation";

export default async function OnboardingCompanyPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  if (!user.data || user.data.userOnboarding === false) {
    return redirect("/onboarding");
  }

  return (
    <>
      <AnimatedLogo />
      <div className="flex flex-col items-center mb-4">
        <div className="font-light text-sm">
          Now let&apos;s get to know your business 📈
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[500px] overflow-y-auto">
        <CompanyProfileForm />
      </div>
      <Button className="mt-4" variant="ghost">
        Join Existing Business
      </Button>
    </>
  );
}
