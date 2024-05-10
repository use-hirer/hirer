"use client";

import { Button } from "@hirer/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <h1 className="text-5xl md:text-8xl text-balance">
        The Open-Source Hiring Platform
      </h1>
      <p className="text-xl md:text-2xl mt-8 text-balance max-w-3xl">
        Hirer is a modern recruiting platform with customisable job board,
        real-time analytics, AI assessments, and full white-labeling.
      </p>
      <div className="pt-8 space-x-2">
        <Link
          href={"https://cal.com/hirer/15min"}
          target="_blank"
          className="font-medium"
        >
          <Button variant={"outline"} size={"lg"} className="rounded-3xl">
            Book a demo
          </Button>
        </Link>
        <Link href={"https://console.hirer.so"} className="font-medium">
          <Button size={"lg"} className="rounded-3xl">
            Start Hiring
          </Button>
        </Link>
      </div>
    </div>
  );
}
