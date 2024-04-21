import { authCheck } from "@/actions/auth";
import HirerLogo from "@/components/icons/hirer-logo";
import NavigationMenu from "@/components/menu/menu";
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
        <div className="lg:hidden flex items-center min-h-12 gap-2">
          <div className="bg-black h-full flex items-center justify-center w-12 cursor-pointer">
            <List weight="bold" size={20} color="white" />
          </div>
          <div className="font-bold">
            <HirerLogo width={80} />
          </div>
        </div>
        <ContentShell>{children}</ContentShell>
      </div>
    </>
  );
}
