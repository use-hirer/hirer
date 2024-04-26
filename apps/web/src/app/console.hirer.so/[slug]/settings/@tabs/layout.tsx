import Link from "next/link";
import { Toaster } from "sonner";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; id: string };
}) {
  return (
    <>
      <div className="flex w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 pt-6">
          <div className="ml-2 grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              <Link href="#" className="font-semibold text-primary">
                General
              </Link>
              <Link href="#">Team</Link>
              <Link href="#">Domains</Link>
              <Link href="#">Billing</Link>
              <Link href="#">Support</Link>
            </nav>
            <div className="grid gap-6">{children}</div>
          </div>
        </main>
        <Toaster richColors position="top-right" closeButton />
      </div>
    </>
  );
}
