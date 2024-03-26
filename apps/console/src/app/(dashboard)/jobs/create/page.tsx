import JobCreateForm from "@console/components/forms/job-create-form";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@console/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@console/components/ui/breadcrumb";
import { Separator } from "@console/components/ui/separator";
import { validateRequest } from "@console/lib/auth";
import { ReadCvLogo } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Create a Job",
};

export default async function JobCreatePage() {
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
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
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
          <Alert>
            <ReadCvLogo className="h-4 w-4" />
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
    </div>
  );
}
