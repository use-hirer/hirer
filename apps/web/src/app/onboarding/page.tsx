import OnboardingForm from "@/components/forms/onboarding-form";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return <OnboardingForm />;
}
