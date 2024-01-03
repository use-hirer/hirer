import NavigationMenu from "@/components/menu/menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex">
        <NavigationMenu />
        <div className="overflow-y-scroll flex-auto bg-white mt-[7px] rounded-tl-2xl shadow-sm border-zinc-950/5 border p-4 md:ml-[250px]">
          {children}
        </div>
      </div>
    </>
  );
}
