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
import { Input } from "@hirer/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobNameSchema = z.object({
  name: z.string().min(1, { message: "Please use at least 1 character." }),
});

type JobNameFormValues = z.infer<typeof jobNameSchema>;

interface JobNameCardProps {
  name: string;
}

const JobNameCard: React.FC<JobNameCardProps> = ({ name }) => {
  const params = useParams() as { slug: string; id: string };
  const updateName = api.job.updateName.useMutation();
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);

  const form = useForm<JobNameFormValues>({
    resolver: zodResolver(jobNameSchema),
    mode: "onChange",
    defaultValues: {
      name: name,
    },
  });

  async function onSubmit(data: JobNameFormValues) {
    setLoading(true);

    if (data.name === name) {
      setLoading(false);
      return;
    }

    try {
      await updateName.mutateAsync({
        id: params.id.split("-")[0],
        name: data.name,
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
        <CardTitle>Job Title</CardTitle>
        <CardDescription>
          Changing the job title will also update the job slug.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
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

export default JobNameCard;
