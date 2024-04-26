"use client";

import Editor from "@/components/editor/editor";
import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import { Button } from "@hirer/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hirer/ui/card";
import { Input } from "@hirer/ui/input";
import Link from "next/link";
import { useParams } from "next/navigation";
import OrganisationNameCard from "./cards/organisation-name";

interface SettingsViewProps {
  org: RouterOutputs["settings"]["getGeneral"];
}

const SettingsView: React.FC<SettingsViewProps> = ({ org }) => {
  const params = useParams() as { slug: string };

  const orgClient = api.settings.getGeneral.useQuery(
    { orgId: params.slug as string },
    { initialData: org }
  );

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 pt-6">
        <div className="ml-2 grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Team</Link>
            <Link href="#">Domains</Link>
            <Link href="#">Billing</Link>
            <Link href="#">Support</Link>
          </nav>
          <div className="grid gap-6">
            <OrganisationNameCard name={orgClient.data!.name} />
            <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
              <CardHeader>
                <CardTitle>Organisation Slug</CardTitle>
                <CardDescription>
                  Your businesses unique ID on hirer (e.g. acme-inc.hirer.so).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="acme-inc" value={org?.slug} />
                </form>
              </CardContent>
              <CardFooter className="border-t py-4 bg-zinc-50 flex justify-between rounded-b-md">
                <div className="text-zinc-500 text-sm">
                  Please use 32 characters at maximum.
                </div>
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
              <CardHeader>
                <CardTitle>Organisation Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-dashed border-slate-300 rounded-md p-4 w-40 h-20 flex justify-center items-center cursor-pointer">
                  <div className="text-xs font-light text-slate-500">
                    Add Logo
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t py-4 bg-zinc-50 flex justify-end rounded-b-md">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
              <CardHeader>
                <CardTitle>Organisation Description</CardTitle>
                <CardDescription>
                  This description will be displayed on the homepage of your job
                  board. <br />
                  <span>
                    No description will remove the description section from the
                    public page.
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="border rounded-md">
                    <Editor
                      value=""
                      setValue={() => {}}
                      placeholder="Enter a description for your organisation"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t py-4 bg-zinc-50 flex justify-between rounded-b-md">
                <div className="text-zinc-500 text-sm"></div>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsView;
