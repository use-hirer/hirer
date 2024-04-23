"use client";

import { ResumeRespnseType } from "@/app/api/upload/autofill/route";
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
import { CircleNotch, Lightning } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

interface JobApplyFormProps {}

const JobApplyFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  additionalInformation: z.string().optional(),
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingFile, setProcessingFile] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    // Perform actions with the selected file
  };

  async function onSubmit(data: JobApplyFormValues) {
    console.log(data);
  }

  useEffect(() => {
    const uploadFile = async () => {
      if (!selectedFile) return;

      setProcessingFile(true);

      try {
        const formdata = new FormData();
        formdata.append("file", selectedFile);
        formdata.append(
          "data",
          JSON.stringify({ filename: selectedFile.name })
        );

        const result = await fetch("/api/upload/autofill", {
          method: "POST",
          body: formdata,
        });

        const data = (await result.json()) as ResumeRespnseType;

        // Check if the data contains any valid autofill items
        if (!data.name && !data.email) {
          toast.error("Unable to identify autofill items in resume.");
          return;
        }

        form.setValue("name", data.name);
        form.setValue("email", data.email);
      } catch (e) {
        toast.error("Unable to identify autofill items in resume.");
      }

      setProcessingFile(false);
    };

    uploadFile();
  }, [form, selectedFile]);

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
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept=".pdf"
            multiple={false}
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={processingFile}
            >
              {processingFile ? (
                <CircleNotch className="h-4 w-4 animate-spin" />
              ) : (
                "Choose File"
              )}
            </Button>
          </label>
          <Input disabled={true} value={selectedFile?.name || ""} />
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
                  <FormLabel>Additional Information</FormLabel>
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
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};

export default JobApplyForm;
