import { authCheck } from "@/actions/auth";
import ScopeRedirect from "@/components/scope-redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const user = await authCheck();

  const scope = cookies().get("scope")?.value;

  if (scope) {
    return redirect(`/${scope}`);
  }

  return <ScopeRedirect userId={user.id} />;
}
