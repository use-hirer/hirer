"use client";

import { Button } from "@hirer/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hirer/ui/form";
import { Input } from "@hirer/ui/input";
import { Textarea } from "@hirer/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lightning } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface JobApplyFormProps {}

const JobApplyFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  additionalInformation: z.string(),
});

type JobApplyFormValues = z.infer<typeof JobApplyFormSchema>;

const JobApplyForm: React.FC<JobApplyFormProps> = () => {
  const form = useForm<JobApplyFormValues>({
    resolver: zodResolver(JobApplyFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      additionalInformation: "",
    },
  });

  async function onSubmit(data: JobApplyFormValues) {
    console.log(data);
  }

  return (
    <div>
      <div className="bg-zinc-50 rounded-md p-8 border">
        <div className="flex gap-1 items-center">
          <Lightning size={18} color="orange" weight="duotone" />
          <div className="font-bold text-base">
            Autofill <span className="text-red-600">*</span>
          </div>
        </div>
        <div className="pt-2">Save time by importing your resume (PDF)</div>
        <div className="flex gap-2 pt-4">
          <Button variant={"outline"}>Choose File</Button>
          <Input disabled={true} />
        </div>
      </div>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Johnny Appleseed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Johnny Appleseed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalInformation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Additional Information{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-36" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="w-full">Apply</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default JobApplyForm;