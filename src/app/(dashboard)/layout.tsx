import NavigationMenu from "@/components/menu/menu";
import Notifications from "@/components/menu/notifications";
import { List } from "@phosphor-icons/react/dist/ssr";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCollapsed = false;

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col lg:flex-row">
        <NavigationMenu collapsed={isCollapsed} />
        <div className="lg:hidden px-4 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List weight="bold" size={20} />
            <div className="font-bold">Hirer</div>
          </div>
          <Notifications />
        </div>
        {/* <div className="absolute hidden lg:ml-[242px] w-5 h-5 lg:flex items-center justify-center bg-black rounded-full mt-[50px] cursor-pointer shadow-md">
          <CaretLeft color="white" />
        </div> */}
        <div
          data-collapsed={isCollapsed}
          className="overflow-y-scroll flex-auto bg-white mt-[7px] lg:rounded-tl-2xl shadow-sm border-zinc-950/5 border p-4 lg:ml-[250px] lg:data-[collapsed=true]:ml-[60px]"
        >
          {children}
        </div>
      </div>
    </>
  );
}
