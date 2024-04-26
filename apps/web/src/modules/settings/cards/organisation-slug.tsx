"use client";

import resetScopeCookie from "@/actions/reset-scope-cookie";
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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const organisationSlugSchema = z.object({
  slug: z
    .string()
    .min(4, { message: "Please use at least 1 character." })
    .max(32, { message: "Please use 32 characters at maximum." }),
});

type OrganisationFormValues = z.infer<typeof organisationSlugSchema>;

interface OrganisationSlugCardProps {
  slug: string;
}

const OrganisationSlugCard: React.FC<OrganisationSlugCardProps> = ({
  slug,
}) => {
  const params = useParams() as { slug: string };
  const updateName = api.settings.updateOrganisationSlug.useMutation();
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<OrganisationFormValues>({
    resolver: zodResolver(organisationSlugSchema),
    mode: "onChange",
    defaultValues: {
      slug: slug,
    },
  });

  async function onSubmit(data: OrganisationFormValues) {
    setLoading(true);

    try {
      await updateName.mutateAsync({
        orgId: params.slug,
        slug: data.slug,
      });

      await resetScopeCookie(data.slug);

      router.push(`/${data.slug}`);
    } catch (e) {
      toast.error("An error occurred! Please try again.");
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Organisation Slug</CardTitle>
        <CardDescription>
          Your businesses unique ID on hirer (e.g. acme-inc.hirer.so).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="acme-inc" {...field} />
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
          Please use 32 characters at maximum.
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircleNotch className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganisationSlugCard;
