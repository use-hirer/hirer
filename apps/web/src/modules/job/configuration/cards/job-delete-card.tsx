"use client";

import { api } from "@/lib/api/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@hirer/ui/alert-dialog";
import { Button } from "@hirer/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hirer/ui/card";
import { CircleNotch } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const JobDeleteCard: React.FC = () => {
  const router = useRouter();
  const params = useParams() as { slug: string; id: string };
  const orgId = params.slug;
  const id = params.id.split("-")[0];

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteJob = api.job.delete.useMutation();
  const utils = api.useUtils();

  async function onSubmit() {
    setLoading(true);

    console.log(id);

    try {
      await deleteJob.mutateAsync({
        orgId: orgId,
        id: id,
      });

      await utils.job.getMany.invalidate();

      router.push(`/${orgId}/jobs`);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="rounded-md border-red-200 flex-grow-0 shadow-sm">
        <CardHeader>
          <CardTitle>Delete Job</CardTitle>
          <CardDescription>
            This cannot be undone and will remove all associated applications.
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t border-red-200 py-4 bg-red-50 flex justify-end rounded-b-md">
          <Button
            onClick={() => setOpen(true)}
            disabled={loading}
            variant={"destructive"}
          >
            {loading ? (
              <CircleNotch className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              account and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobDeleteCard;
