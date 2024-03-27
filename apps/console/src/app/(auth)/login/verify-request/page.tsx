import { validateRequest } from "@console/lib/auth";
import { Envelope } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer | Verify Request",
  description: "Login into the Hirer console.",
};

export default async function VerifyRequestPage() {
  const user = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <>
      <div className="flex items-center justify-center container relative h-screen min-h-[600px] flex-col place-items-center lg:max-w-none lg:grid-cols-2 lg:px-0 bg-white">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex items-center justify-center select-none">
                <div className="flex items-center justify-center w-9 h-9 bg-black shadow-sm text-white rounded-full text-md font-extrabold">
                  <Envelope />
                </div>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Check your email!
              </h1>
              <p className="text-sm text-muted-foreground">
                A sign in link has been sent to your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
