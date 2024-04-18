import { UserAuthForm } from "@/components/auth/use-auth-form";
import { validateRequest } from "@/lib/auth";
import { Metadata } from "next";
import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hirer | Login",
  description: "Login into the Hirer console.",
};

export default async function AuthenticationPage() {
  const { user } = await validateRequest();

  if (user) {
    redirect("/", RedirectType.push);
  }

  return (
    <>
      <div className="container relative h-[calc(100dvh)] min-h-[600px] flex-col grid place-items-center lg:max-w-none lg:grid-cols-2 lg:px-0 bg-white">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-extrabold gap-1">
            <Image
              src={"/hirer-full-logo-white.png"}
              alt="Hirer Logo"
              width={70}
              height={100}
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Did you know? Hirer&apos;s AI-driven search efficiently scours
                every detail in applicant resumes, guaranteeing that no
                information goes unnoticed.
              </p>
              <footer className="text-sm text-orange-500">
                hirer.so tip #4
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex w-full justify-center">
                <div className="lg:hidden flex items-center justify-center w-8 h-8  rounded-full text-md font-extrabold">
                  <Image
                    src={"/hirer-icon.png"}
                    alt="Hirer Logo"
                    width={70}
                    height={100}
                  />{" "}
                </div>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to Hirer
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to access your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
