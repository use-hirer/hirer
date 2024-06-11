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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@hirer/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hirer/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobStatusSchema = z.object({
  status: z.union([z.literal("Open"), z.literal("Draft"), z.literal("Closed")]),
});

type JobStatusFormValues = z.infer<typeof jobStatusSchema>;

interface JobStatusCardProps {
  status: "Open" | "Draft" | "Closed";
}

const JobStatusCard: React.FC<JobStatusCardProps> = ({ status }) => {
  const params = useParams() as { slug: string; id: string };
  const updateStatus = api.job.updateStatus.useMutation();
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);

  const form = useForm<JobStatusFormValues>({
    resolver: zodResolver(jobStatusSchema),
    mode: "onChange",
    defaultValues: {
      status: status,
    },
  });

  async function onSubmit(data: JobStatusFormValues) {
    setLoading(true);

    if (data.status === status) {
      setLoading(false);
      return;
    }

    try {
      await updateStatus.mutateAsync({
        id: params.id.split("-")[0],
        status: data.status,
      });
      await utils.job.getMany.invalidate();
      await utils.job.get.invalidate({ id: params.id });

      toast.success("Job status updated successfully.");
    } catch (e) {
      toast.error("An error occurred! Please try again.");
    }

    setLoading(false);
  }

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Job Status</CardTitle>
        <CardDescription>
          Changing the job status to Open, will make the job visible to all
          applicants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
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

export default JobStatusCard;
