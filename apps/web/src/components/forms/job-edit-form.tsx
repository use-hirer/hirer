"use client";

import { Button } from "@hirer/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hirer/ui/form";
import { Input } from "@hirer/ui/input";
import { Textarea } from "@hirer/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const jobFormSchema = z.object({
  position: z.string().min(1, "Every job needs a title."),
  location: z
    .string()
    .min(1, "A location is required, either remote or place(s)."),
  description: z.string().min(1, "Job description is required."),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobEditFormProps {}

const JobEditForm: React.FC<JobEditFormProps> = () => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    mode: "onChange",
    defaultValues: {
      position: "",
      location: "",
      description: "",
    },
  });

  function onSubmit(data: JobFormValues) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="position"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Job Title <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Location <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Melbourne, Australia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>
                    Job description <span className="text-red-600">*</span>
                  </FormLabel>
                  <Button size={"sm"} variant={"outline"}>
                    Generate with AI
                  </Button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="We are seeking a talented Software Engineer to join our dynamic team in building cutting-edge software solutions. As a Software Engineer, you will play a crucial role in designing, developing, and maintaining high-quality software applications."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Struggling to write something down? Click the &apos;Generate
                  with AI&apos; button.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Save Job</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobEditForm;
