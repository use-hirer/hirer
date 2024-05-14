import CompanyProfileForm from "@/components/forms/company-profile-form";
import HirerLogo from "@/components/icons/hirer-logo";
import { validateRequest } from "@/lib/auth";
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
      <HirerLogo width={100} className="mb-4" />
      <div className="flex flex-col items-center">
        <div className="font-light text-sm">
          Now let&apos;s get to know your business 📈
        </div>
      </div>
      <div className="p-4 max-w-[500px] container overflow-y-auto">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <CompanyProfileForm />
        </div>
      </div>
    </>
  );
}
