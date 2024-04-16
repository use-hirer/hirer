"use client";

import Editor from "@/components/editor/editor";
import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
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
  FormMessage,
} from "@hirer/ui/form";
import { Label } from "@hirer/ui/label";
import { Separator } from "@hirer/ui/separator";
import { Slider } from "@hirer/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Broadcast,
  CircleNotch,
  Copy,
  Link as LinkIcon,
} from "@phosphor-icons/react";
import { Textarea } from "@tremor/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

interface SharingTabViewProps {
  job: RouterOutputs["job"]["get"];
}

const socialPostSchema = z.object({
  post: z.string(),
});

type SocialPostFormValues = z.infer<typeof socialPostSchema>;

const SharingTabView: React.FC<SharingTabViewProps> = ({ job }) => {
  const [generatingPost, setGeneratingPost] = useState(false);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [postLength, setPostLength] = useState(300);

  const slug = useParams()["slug"];

  const generatePost = api.ai.generateSocialMediaPost.useMutation({});

  const link = `https://${slug}.hirer.so/job/${job.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast.info("Public link has been copied to clipboard");
    });
  };

  const form = useForm<SocialPostFormValues>({
    resolver: zodResolver(socialPostSchema),
    mode: "onChange",
    defaultValues: {
      post: "",
    },
  });

  async function onSubmit(data: SocialPostFormValues) {
    console.log(data);
  }

  return (
    <div>
      <div className="pt-4">
        <div className="font-bold flex items-center gap-2 pb-2">
          Public Link <LinkIcon />
        </div>
        <div className="bg-zinc-50 p-1 px-3 rounded-md mb-6 break-all text-sm border border-zinc-950/5 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center gap-1"
          >
            {link}
          </Link>
          <Button size={"icon"} variant={"ghost"} onClick={copyToClipboard}>
            <Copy />
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <div className="flex justify-between items-center pb-2">
          <div className="font-bold flex items-center gap-2">
            Social Media <Broadcast />
          </div>
          <Button
            type="button"
            size={"sm"}
            variant={"outline"}
            disabled={generatingPost}
            onClick={async () => {
              setOpenGenerateModal(true);
            }}
          >
            {generatingPost && (
              <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate with AI
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="post"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <Editor
                        value={field.value}
                        setValue={field.onChange}
                        placeholder="Exciting opportunity alert! 🚀 We're hiring a talented Fullstack Engineer to join our innovative team at Acme Inc. 📝 Apply here: https://acme-inc.hirer.so/job/fullstack-engineer"
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
              <Button type="submit">
                Copy Post <Copy className="ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Toaster position="top-right" richColors closeButton />
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
            <div className="flex items-center justify-between">
              <Label htmlFor="Post Length">Post Length</Label>
              <span className="text-sm text-muted-foreground">
                {postLength} characters
              </span>
            </div>
            <Slider
              defaultValue={[300]}
              max={500}
              min={30}
              step={1}
              onValueChange={(value) => setPostLength(value[0])}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="Additional Information">Additional Info</Label>
            <Textarea
              placeholder="Add relevant hashtags relating to the job title."
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
              disabled={generatingPost}
              type="submit"
              onClick={async () => {
                setGeneratingPost(true);

                const result = await generatePost.mutateAsync({
                  jobName: job.title,
                  location: job.location,
                  length: postLength,
                  additionalInformation: additionalInformation,
                  link: link,
                });

                form.setValue("post", "");
                form.setValue("post", result);

                setGeneratingPost(false);
                setOpenGenerateModal(false);
              }}
            >
              {generatingPost && (
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

export default SharingTabView;
