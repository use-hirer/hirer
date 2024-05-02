import { Toaster } from "sonner";
import TabGroup from "./tab-group";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      <div className="flex w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 pt-6">
          <div className="ml-2 grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
            <TabGroup />
            <div className="grid gap-6">{children}</div>
          </div>
        </main>
        <Toaster richColors position="top-right" closeButton />
      </div>
    </>
  );
}
