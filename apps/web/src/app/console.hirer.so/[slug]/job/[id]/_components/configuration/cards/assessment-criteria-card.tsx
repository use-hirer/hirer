"use client";

import { api } from "@/lib/api/react";
import { Button } from "@hirer/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hirer/ui/card";
import { Checkbox } from "@hirer/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hirer/ui/form";
import { Textarea } from "@hirer/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobNameSchema = z.object({
  name: z.string().optional(),
  includeJobDescription: z.boolean(),
});

type JobNameFormValues = z.infer<typeof jobNameSchema>;

interface JobNameCardProps {
  name: string;
}

const AssessmentCriteriaCard: React.FC<JobNameCardProps> = ({ name }) => {
  const params = useParams() as { slug: string; id: string };
  const updateName = api.job.updateName.useMutation();
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);

  const form = useForm<JobNameFormValues>({
    resolver: zodResolver(jobNameSchema),
    mode: "onChange",
    defaultValues: {
      name: name,
      includeJobDescription: true,
    },
  });

  useEffect(() => {
    const name = form.getValues("name");
    if (name?.length === 0) {
      console.log("name is empty");
      form.setValue("includeJobDescription", true);
    }
  }, [form, form.getValues("name")]);

  async function onSubmit(data: JobNameFormValues) {
    setLoading(true);

    if (data.name === name) {
      setLoading(false);
      return;
    }

    try {
      //   await updateName.mutateAsync({
      //     id: params.id.split("-")[0],
      //     name: data.name,
      //   });
      await utils.job.getMany.invalidate();
      await utils.job.get.invalidate({ id: params.id });

      toast.success("Job name updated successfully.");
    } catch (e) {
      toast.error("An error occurred! Please try again.");
    }

    setLoading(false);
  }

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Assessment Criteria</CardTitle>
        <CardDescription>
          Adjust the applicants AI evaluation score by adding your own
          assessment criteria. Please be specific in your instructions. This
          will be applied to all applicants for this job. Leaving it blank will
          use the job description as the assessment criteria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Criteria</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Score applicant higher if the applicant has experience with using BI tools such as PowerBI or Amazon Quicksight. Applicant with 6-18 months of PowerBI use is the ideal fit."
                      {...field}
                      className="min-h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeJobDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Include Job Description in Assessment Criteria
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        const name = form.getValues("name");
                        if (name?.length === 0) {
                          // Prevent unchecking when name is empty
                          return;
                        }
                        field.onChange(checked);
                      }}
                      disabled={form.getValues("name")?.length === 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t py-4 bg-zinc-50 flex justify-end rounded-b-md">
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircleNotch className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCriteriaCard;
