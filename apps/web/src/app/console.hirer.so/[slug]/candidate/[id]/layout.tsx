import { api } from "@/lib/api/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@hirer/ui/breadcrumb";
import { Separator } from "@hirer/ui/separator";
import Link from "next/link";

export default async function Layout({
  children,
  tabs,
  params,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
  params: { slug: string; id: string };
}) {
  const candidate = await api.candidate.get({
    id: params.id,
    teamId: params.slug,
  });

  return (
    <>
      <div className="scroll-bar">
        <div className="py-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={`/${params.slug}`}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={`/${params.slug}/jobs`}>Candidates</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{candidate?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className="my-2" />
        <div className="font-extrabold text-xl py-2 flex items-center gap-2">
          {candidate?.name}{" "}
          <span className="font-normal text-xs text-zinc-500 mt-1">
            (ID: {candidate?.id})
          </span>
        </div>
        <Separator className="my-2" />
        <div className="flex-grow overflow-y-auto">{tabs}</div>
      </div>
    </>
  );
}
