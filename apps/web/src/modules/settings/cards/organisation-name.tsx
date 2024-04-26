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
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const organisationNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please use at least 1 character." })
    .max(32, { message: "Please use 32 characters at maximum." }),
});

type OrganisationFormValues = z.infer<typeof organisationNameSchema>;

interface OrganisationNameCardProps {
  name: string;
}

const OrganisationNameCard: React.FC<OrganisationNameCardProps> = ({
  name,
}) => {
  const params = useParams() as { slug: string };
  const updateName = api.settings.updateOrganisationName.useMutation();
  const utils = api.useUtils();

  const form = useForm<OrganisationFormValues>({
    resolver: zodResolver(organisationNameSchema),
    mode: "onChange",
    defaultValues: {
      name: name,
    },
  });

  async function onSubmit(data: OrganisationFormValues) {
    console.log(data);
    console.log(params);

    await updateName.mutateAsync({
      orgId: params.slug,
      name: data.name,
    });

    await utils.user.getOrgs.invalidate();
    await utils.settings.getGeneral.invalidate();
  }

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Organisation Name</CardTitle>
        <CardDescription>
          Used to identify your organisation in Hirer.
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
                    <Input placeholder="ACME Inc" {...field} />
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
        <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default OrganisationNameCard;
