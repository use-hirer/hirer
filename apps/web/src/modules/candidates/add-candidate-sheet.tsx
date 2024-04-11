"use client";

import { api } from "@/lib/api/react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@hirer/ui/sheet";
import { Textarea } from "@hirer/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

const candidateFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter the candidate's name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .optional(),
  notes: z.string().optional(),
});

type CandidateFormValues = z.infer<typeof candidateFormSchema>;

interface AddCandidateSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orgId: string;
  // TODO: Fix Type for Refetch
  refetch: () => Promise<any>;
}

const AddCandidateSheet: React.FC<AddCandidateSheetProps> = ({
  open,
  setOpen,
  orgId,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const createCandidate = api.candidate.create.useMutation();

  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      resume: undefined,
      notes: "",
    },
  });

  async function onSubmit(data: CandidateFormValues) {
    setLoading(true);

    try {
      await createCandidate.mutateAsync({
        email: data.email,
        name: data.name,
        notes: data.notes,
        teamId: orgId,
      });

      await refetch();

      setOpen(false);
      setLoading(false);
    } catch (e) {
      toast.error("An error ocurred adding the candidate, please try again.");
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a candidate</SheetTitle>
          <SheetDescription>
            Manually add a candidate to Hirer for tracking & assessment.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Steve Jobs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="steve.jobs@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, ref } }) => (
                <FormItem>
                  <FormLabel>Resume/CV</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes about the candidate"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Candidate
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddCandidateSheet;
