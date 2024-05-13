"use client";

import Editor from "@/components/editor/editor";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const organisationDescriptionSchema = z.object({
  description: z.string().optional(),
});

type OrganisationFormValues = z.infer<typeof organisationDescriptionSchema>;

interface OrganisationDescriptionCardProps {
  description: string;
}

const OrganisationDescriptionCard: React.FC<
  OrganisationDescriptionCardProps
> = ({ description }) => {
  const params = useParams() as { slug: string };
  const updateDescription =
    api.settings.updateOrganisationDescription.useMutation();
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);

  const form = useForm<OrganisationFormValues>({
    resolver: zodResolver(organisationDescriptionSchema),
    mode: "onChange",
    defaultValues: {
      description: description,
    },
  });

  async function onSubmit(data: OrganisationFormValues) {
    setLoading(true);

    if (data.description === description) {
      setLoading(false);
      return;
    }

    try {
      await updateDescription.mutateAsync({
        orgId: params.slug,
        description: data.description?.trim() === "" ? "" : data.description,
      });

      await utils.user.getOrgs.invalidate();
      await utils.settings.getGeneral.invalidate();
    } catch (e) {
      toast.error("An error occurred! Please try again.");
    }

    setLoading(false);
  }

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Organisation Description</CardTitle>
        <CardDescription>
          This description will be displayed on the homepage of your job board.{" "}
          <br />
          <span>
            No description will remove the description section from the public
            page.
          </span>
        </CardDescription>
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
                    <div className="border rounded-md">
                      <Editor
                        value={field.value || ""}
                        setValue={field.onChange}
                        placeholder="Enter a description for your organisation"
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
      <CardFooter className="border-t py-4 bg-zinc-50 flex justify-end rounded-b-md">
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircleNotch className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganisationDescriptionCard;
