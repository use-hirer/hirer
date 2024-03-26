import { buttonVariants } from "@console/components/ui/button";
import { validateRequest } from "@console/lib/auth";
import { cn } from "@console/lib/utils";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { Toaster } from "sonner";
import { UserAuthForm } from "../../../components/auth/use-auth-form";

export const metadata: Metadata = {
  title: "Hirer | Create an Account",
  description: "Login into the Hirer console.",
};

export default async function AuthenticationPage() {
  const { user } = await validateRequest();

  if (user) {
    redirect("/", RedirectType.push);
  }

  return (
    <>
      <div className="container relative h-screen min-h-[600px] flex-col grid place-items-center lg:max-w-none lg:grid-cols-2 lg:px-0 bg-white">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login 🚀
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-extrabold gap-1">
            <Sparkle color="white" />
            Hirer
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Did you know? Hirer&apos;s AI-driven search efficiently scours
                every detail in applicant resumes, guaranteeing that no
                information goes unnoticed.
              </p>
              <footer className="text-sm text-orange-500">
                usehirer.com tip #4
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
