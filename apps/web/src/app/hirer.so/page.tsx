import HirerLogo from "@/components/icons/hirer-logo";
import { Button } from "@hirer/ui/button";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const carousel = [
  { title: "Secure Transactions" },
  { title: "Proxy Voting Capabilities" },
  { title: "Swift and Effortless Account Setup" },
  { title: "Merging Identical Entries" },
  { title: "Customized Domain Options" },
  { title: "Allow Guest Financial Insights" },
  { title: "Advanced Textual Analysis Tools" },
  { title: "Tailored Brand Color Schemes" },
  { title: "Define Financial Profile Images" },
  { title: "Choose Between Dark and Light Finance Views" },
  { title: "Priority Account Alerts" },
  { title: "Internal Financial Discussions" },
];

export default function HirerPage() {
  return (
    <div className="overflow-y-auto">
      <div className="container bg-zinc-50">
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
        <div className="w-full mx-auto px-4 md:px-8 h-screen bg-white rounded-lg shadow-md border">
          <div className="pt-12">
            <h1 className="text-5xl md:text-8xl text-balance">
              The Open-Source Hiring Platform
            </h1>
            <p className="text-xl md:text-2xl mt-8 text-balance max-w-3xl">
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
              <Link
                href={"https://console.hirer.so"}
                target="_blank"
                className="font-medium"
              >
                <Button size={"lg"} className="rounded-3xl">
                  Start Hiring
                </Button>
              </Link>
            </div>
          </div>
          <div className="pt-24">
            <div className="relative max-w-screen-xl mx-auto">
              <div className="relative py-12 mx-auto overflow-hidden overflow-x-hidden 2xl:max-w-screen-xl">
                <div className="flex flex-col gap-4">
                  <div className="relative flex items-center gap-2 animate-marqueeRight whitespace-nowrap">
                    {carousel.map((tagline) => (
                      <>
                        <div className="inline-flex items-center gap-3 px-4 py-2 font-mono text-sm font-medium tracking-tighter uppercase duration-200  bg-gradient-to-b hover:bg-zinc-50 border shadow-sm rounded-xl transform-colors  shadow-gray-500/20 group">
                          <CheckCircle />
                          <span>{tagline.title}</span>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="relative flex items-center gap-2 animate-marqueeLeft whitespace-nowrap">
                    {carousel.map((tagline) => (
                      <>
                        <div className="inline-flex items-center gap-3 px-4 py-2 font-mono text-sm font-medium tracking-tighter uppercase duration-200  bg-gradient-to-b hover:bg-zinc-50 border shadow-sm rounded-xl transform-colors  shadow-gray-500/20 group">
                          <CheckCircle />
                          <span>{tagline.title}</span>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}