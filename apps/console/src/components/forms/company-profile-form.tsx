"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

const companyFormSchema = z.object({
  name: z.string().min(1, { message: "Every business needs a name!" }),
  website: z
    .string()
    // .url({
    //   message:
    //     "Please enter a valid website URL. Include the https:// or http://",
    // })
    .optional(),
  // .or(z.literal("")),
  description: z.string().optional(),
  logo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .optional(),
});

type ProfileFormValues = z.infer<typeof companyFormSchema>;

interface CompanyProfileFormProps {}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(companyFormSchema),
    mode: "onChange",
    defaultValues: {
      logo: undefined,
      name: "",
      website: "",
      description: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Business Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Tesla Motors" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://tesla.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Join a global team of expert engineers, production workers and safety professionals building some of the most exciting cars on the planet."
                  className="resize-none min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({}) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Controller
                  name="logo"
                  control={form.control}
                  render={({ field: { onChange, ref } }) => (
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file && file.size <= MAX_FILE_SIZE) {
                          onChange(file);
                        } else {
                          onChange(undefined);
                          alert("File size exceeds the maximum limit of 2MB.");
                          event.target.value = "";
                        }
                      }}
                      ref={ref}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex w-full" type="submit">
          Get Started
        </Button>
      </form>
    </Form>
  );
};

export default CompanyProfileForm;
