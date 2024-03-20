import JobCreateForm from "@console/components/forms/job-create-form";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@console/components/ui/alert";
import { Separator } from "@console/components/ui/separator";
import { ReadCvLogo } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: Create a Job",
};

export default function JobsPage() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Create a Job</div>
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
