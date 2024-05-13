import { validateRequest } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@hirer/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@hirer/ui/breadcrumb";
import { Separator } from "@hirer/ui/separator";
import { HandsClapping } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import JobCreateForm from "../_forms/job-create-form";

export const metadata: Metadata = {
  title: "Hirer: Create a Job",
};

export default async function JobsCreatePage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
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
                <BreadcrumbPage>Create a Job</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className="my-2" />
        <div className="font-extrabold text-xl py-2">Create a Job</div>
        <Separator className="my-2" />
        <div className="my-4 text-sm">
          <Alert className="bg-zinc-50">
            <HandsClapping className="h-5 w-5" />
            <AlertTitle>You&apos;re on your way!</AlertTitle>
            <AlertDescription>
              After creating a job, you&apos;ll be directed to the configuration
              page to set AI evaluation criteria, form submission questions, and
              more.
            </AlertDescription>
          </Alert>
        </div>
        <div>
          <JobCreateForm />
        </div>
      </div>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}
