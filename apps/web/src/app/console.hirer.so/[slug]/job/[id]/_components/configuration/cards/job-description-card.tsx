"use client";

import Editor from "@/components/editor/editor";
import { api } from "@/lib/api/react";
import { Button } from "@hirer/ui/button";
import {
  Card,
  CardContent,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobDescriptionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Please use at least 1 character." }),
});

type JobDescriptionFormValues = z.infer<typeof jobDescriptionSchema>;

interface JobNameCardProps {
  description: string;
}

const JobNameCard: React.FC<JobNameCardProps> = ({ description }) => {
  const params = useParams() as { slug: string; id: string };
  const updateDescription = api.job.updateDescription.useMutation();
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);

  const form = useForm<JobDescriptionFormValues>({
    resolver: zodResolver(jobDescriptionSchema),
    mode: "onChange",
    defaultValues: {
      description: description,
    },
  });

  async function onSubmit(data: JobDescriptionFormValues) {
    setLoading(true);

    if (data.description === description) {
      setLoading(false);
      return;
    }

    try {
      await updateDescription.mutateAsync({
        id: params.id.split("-")[0],
        description: data.description,
      });
      await utils.job.getMany.invalidate();
      await utils.job.get.invalidate({ id: params.id });
    } catch (e) {
      toast.error("An error occurred! Please try again.");
    }

    setLoading(false);
  }

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <Editor
                        value={field.value}
                        setValue={field.onChange}
                        placeholder="We are seeking a talented Software Engineer to join our dynamic team in building cutting-edge software solutions. As a Software Engineer, you will play a crucial role in designing, developing, and maintaining high-quality software applications."
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t py-4 bg-zinc-50 flex justify-between rounded-b-md">
        <div className="text-zinc-500 text-sm">
          A better description will help you attract more applicants.
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircleNotch className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobNameCard;
