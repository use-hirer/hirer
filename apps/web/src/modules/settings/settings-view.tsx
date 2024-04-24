"use client";

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

const SettingsView = () => {
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
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
              <CardHeader>
                <CardTitle>Organisation Name</CardTitle>
                <CardDescription>
                  Used to identify your organisation in Hirer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="ACME Inc" />
                </form>
              </CardContent>
              <CardFooter className="border-t py-4 bg-zinc-50 flex justify-between">
                <div className="text-zinc-500 text-sm">
                  Please use 32 characters at maximum.
                </div>
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
              <CardHeader>
                <CardTitle>Organisation Slug</CardTitle>
                <CardDescription>
                  Your businesses unique ID on hirer (e.g. acme-inc.hirer.so).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="acme-inc" />
                </form>
              </CardContent>
              <CardFooter className="border-t py-4 bg-zinc-50 flex justify-between">
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
                <div className="border border-dashed border-slate-300 rounded-md p-4 w-40 h-20 flex justify-center items-center">
                  <div className="text-xs font-light text-slate-500">
                    Add Logo
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t py-4 bg-zinc-50 flex justify-end">
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
