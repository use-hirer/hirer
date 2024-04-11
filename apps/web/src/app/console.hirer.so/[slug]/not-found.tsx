import NotFoundError from "@/components/not-found-error";
import { validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function resetCookies() {
  "use server";

  cookies().delete("scope");
  redirect("/");
}

export default async function NotFound() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return <NotFoundError email={user.email} resetCookies={resetCookies} />;
}
