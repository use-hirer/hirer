"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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

const companyFormSchema = z.object({
  name: z.string().min(1, { message: "Every business needs a name!" }),
  website: z
    .string()
    .url({ message: "Please enter a valid website URL." })
    .optional(),
  description: z.string().optional(),
  logo: z.instanceof(FileList).optional(),
});

type ProfileFormValues = z.infer<typeof companyFormSchema>;

interface CompanyProfileFormProps {}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(companyFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast.info(JSON.stringify(data));
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
                  placeholder="We're building a world powered by solar energy, running on batteries and transported by electric vehicles. Explore the most recent impact of our products, people and supply chain."
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Controller
                  name="logo"
                  control={form.control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="file"
                      onChange={(event) => {
                        onChange(event.target.files?.[0]);
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
