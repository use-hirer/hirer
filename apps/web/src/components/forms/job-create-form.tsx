"use client";

import { GenerateJobDescription } from "@/actions/generate-text";
import { Button } from "@hirer/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@hirer/ui/dialog";
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
import { Label } from "@hirer/ui/label";
import { Textarea } from "@hirer/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Editor from "../editor/editor";

const jobFormSchema = z.object({
  position: z.string().min(1, "Every job needs a title."),
  location: z
    .string()
    .min(1, "A location is required, either remote or place(s)."),
  description: z.string().min(1, "Job description is required."),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobCreateFormProps {}

const JobCreateForm: React.FC<JobCreateFormProps> = () => {
  const [generateDescription, setGeneratingDescription] = useState(false);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);
  const [additionalInformation, setAdditionalInformation] = useState("");

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
                  <Button
                    type="button"
                    size={"sm"}
                    variant={"outline"}
                    disabled={generateDescription}
                    onClick={async () => {
                      const position = form.getValues("position");
                      const location = form.getValues("location");

                      if (position === "" || location === "") {
                        toast.error(
                          "We need both the job title & location to generate a description!"
                        );
                      } else {
                        setOpenGenerateModal(true);
                      }
                    }}
                  >
                    {generateDescription && (
                      <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Generate with AI
                  </Button>
                </div>
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
                <FormDescription>
                  Struggling to write something down? Click the &apos;Generate
                  with AI&apos; button.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Create Job</Button>
          </div>
        </form>
      </Form>
      <Dialog
        open={openGenerateModal}
        onOpenChange={() => setOpenGenerateModal(!openGenerateModal)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Description</DialogTitle>
            <DialogDescription>
              Add additional job details to improve the generation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Textarea
              placeholder="Include a section on how we offer employee benefits such as public transport & gym membership reimbursement."
              className="min-h-48"
              value={additionalInformation}
              onChange={(e) => setAdditionalInformation(e.currentTarget.value)}
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={generateDescription}
              type="submit"
              onClick={async () => {
                setGeneratingDescription(true);

                const result = await GenerateJobDescription(
                  form.getValues("position"),
                  form.getValues("location"),
                  additionalInformation
                );

                form.setValue("description", "");
                form.setValue("description", result);
                form.clearErrors("description");

                setGeneratingDescription(false);
                setOpenGenerateModal(false);
              }}
            >
              {generateDescription && (
                <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobCreateForm;
