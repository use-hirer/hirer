import NavigationMenu from "@console/components/menu/menu";
import Notifications from "@console/components/menu/notifications";
import { validateRequest } from "@console/lib/auth";
import { List } from "@phosphor-icons/react/dist/ssr";
import { redirect } from "next/navigation";
import ContentShell from "./content-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col lg:flex-row">
        <NavigationMenu userSession={user} />
        <div className="lg:hidden px-4 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List weight="bold" size={20} />
            <div className="font-bold">Hirer</div>
          </div>
          <Notifications />
        </div>
        <ContentShell>{children}</ContentShell>
      </div>
    </>
  );
}
