import NavigationMenu from "@console/components/menu/menu";
import Notifications from "@console/components/menu/notifications";
import { authOptions } from "@console/lib/auth";
import { List } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col lg:flex-row">
        <NavigationMenu userSession={session} />
        <div className="lg:hidden px-4 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List weight="bold" size={20} />
            <div className="font-bold">Hirer</div>
          </div>
          <Notifications />
        </div>
        <div className="overflow-y-scroll flex-auto bg-white mt-[7px] lg:rounded-tl-2xl shadow-sm border-zinc-950/5 border p-4 lg:ml-[250px] lg:data-[collapsed=true]:ml-[60px]">
          {children}
        </div>
      </div>
    </>
  );
}
