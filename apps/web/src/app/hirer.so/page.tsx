import HirerLogo from "@/components/icons/hirer-logo";
import { Button } from "@hirer/ui/button";
import Link from "next/link";

export default function HirerPage() {
  return (
    <div className="container bg-zinc-50 scroll-bar">
      <div className="flex py-4 px-4 justify-between items-center">
        <HirerLogo width={80} />
        <div className="flex gap-4 items-center">
          <Link href={"https://console.hirer.so"} className="font-medium">
            Login
          </Link>
          <Button
            size={"sm"}
            className="text-sm rounded-xl hover:shadow-md hover:shadow-gray-400 font-medium"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="flex flex-1  w-full mx-auto px-4 md:px-8 h-screen bg-white rounded-lg shadow-md border">
        <div className="pt-12">
          <h1 className="text-4xl md:text-8xl text-balance">
            The Open-Source Hiring Platform
          </h1>
          <p className="text-2xl mt-8 text-balance max-w-3xl">
            Hirer is a modern recruiting platform with customisable job board,
            real-time analytics, AI assessments, and and full white-labeling.
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
            <Button size={"lg"} className="rounded-3xl">
              Start Hiring
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
