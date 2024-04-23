import { authCheck } from "@/actions/auth";
import NavigationMenu from "@/components/menu/menu";
import MobileNav from "@/components/menu/mobile/mobile-nav";
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
        <MobileNav />
        <ContentShell>{children}</ContentShell>
      </div>
    </>
  );
}
