/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anthropic: Sales Operations",
};

export default function JobPage() {
  return (
    <div className="container h-screen pt-4">
      <img
        src="https://lever-client-logos.s3.us-west-2.amazonaws.com/d63643d1-7a20-4e1b-b46d-5308d32d64c2-1622139505411.png"
        className="h-12 px-4 pb-2"
        alt=""
      />
      <div className="h-full bg-white rounded-t-2xl shadow-sm border-zinc-950/5 border p-6">
        <div className="font-extrabold text-2xl">Sales Operations</div>
        <div className="font-normal text-lg">Melbourne, Australia</div>
        <Separator className="my-3" />
        <div className="font-normal text-lg">
          Business Operations / Full-Time / Hybrid
        </div>
      </div>
    </div>
  );
}
