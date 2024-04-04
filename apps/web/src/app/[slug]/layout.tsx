import { authCheck } from "@/actions/auth";
import NavigationMenu from "@/components/menu/menu";
import Notifications from "@/components/menu/notifications";
import { List } from "@phosphor-icons/react/dist/ssr";
import ContentShell from "./content-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authCheck();

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col lg:flex-row overflow-hidden">
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
