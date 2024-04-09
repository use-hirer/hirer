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
  const job = await api.job.get({ id: params.id });

  return (
    <>
      <div className="flex flex-col h-full">
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
                  <Link href={`/${params.slug}/jobs`}>Jobs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{job.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className="my-2" />
        <div className="font-extrabold text-xl py-2 gt">{job.title}</div>
        <Separator className="my-2" />
        <div className="flex-none">
          {children}
          <div>{tabs}</div>
        </div>
      </div>
    </>
  );
}
