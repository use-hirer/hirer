import JobEditForm from "@console/components/forms/job-edit-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@console/components/ui/breadcrumb";
import { Separator } from "@console/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: View Job",
};

export default function JobEditPage() {
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
                <BreadcrumbLink href="/job">Software Engineer</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className="my-2" />
        <div className="font-extrabold text-xl py-2">
          Edit: Software Engineer
        </div>
        <Separator className="my-2" />
        <div className="my-4 text-sm"></div>
        <div>
          <JobEditForm />
        </div>
      </div>
    </div>
  );
}
