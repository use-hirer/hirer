import HirerLogo from "@/components/icons/hirer-logo";
import { carousel } from "@/lib/constants/carousel";
import { Button } from "@hirer/ui/button";
import { CheckCircle, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function HirerPage() {
  return (
    <div className="overflow-y-auto h-screen">
      <div className="container bg-zinc-50">
        <div className="flex py-4 px-8 justify-between items-center">
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
        <div className="w-full mx-auto px-4 md:px-8 bg-white rounded-lg shadow-md border">
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
              <Link href={"https://console.hirer.so"} className="font-medium">
                <Button size={"lg"} className="rounded-3xl">
                  Start Hiring
                </Button>
              </Link>
            </div>
          </div>
          <div className="pt-16">
            <div className="bg-zinc-50 rounded-lg border h-[250px] md:h-[500px] flex items-center justify-center">
              <PlayCircle size={50} weight="thin" className="text-zinc-300" />
            </div>
          </div>
          <div className="pt-8">
            <div className="lg:text-center">
              <p className="mt-8 text-4xl tracking-tighter text-blue-950">
                Comprehensive suite of recruiting{" "}
                <span className="md:block md:text-transparent md:bg-clip-text md:bg-gradient-to-r from-zinc-400 to-zinc-600">
                  services and solutions for your needs
                </span>
              </p>
              <p className="max-w-sm mt-4 text-base text-gray-700 lg:mx-auto lg:text-base">
                Explore a wide range of hiring tools, features, and support for
                your businesses goals
              </p>
            </div>{" "}
            <div className="relative max-w-screen-xl mx-auto">
              <div className="relative py-12 mx-auto overflow-hidden overflow-x-hidden 2xl:max-w-screen-xl">
                <div className="flex flex-col gap-4">
                  <div className="relative flex items-center gap-2 animate-marqueeRight whitespace-nowrap">
                    {carousel.map((tagline, index) => (
                      <>
                        <div
                          key={index}
                          className="inline-flex items-center gap-3 px-4 py-2 font-mono text-sm font-medium tracking-tighter uppercase duration-200  bg-gradient-to-b hover:bg-zinc-50 border shadow-sm rounded-xl transform-colors  shadow-gray-500/20 group"
                        >
                          <CheckCircle />
                          <span>{tagline.title}</span>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="relative flex items-center gap-2 animate-marqueeLeft whitespace-nowrap">
                    {carousel.map((tagline, index) => (
                      <>
                        <div
                          key={index}
                          className="inline-flex items-center gap-3 px-4 py-2 font-mono text-sm font-medium tracking-tighter uppercase duration-200  bg-gradient-to-b hover:bg-zinc-50 border shadow-sm rounded-xl transform-colors  shadow-gray-500/20 group"
                        >
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
        <div className="py-8 px-4 md:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-6">
              <HirerLogo width={100} />
              <p className="max-w-xs text-sm text-gray-500">
                Giving modern marketing teams superpowers with short links that
                stand out.
              </p>
              <p className="text-sm leading-5 text-gray-400">© 2024 Hirer</p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://twitter.com/usehirer"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-px h-4 w-4 text-gray-600 transition-colors group-hover:text-black"
                  >
                    <path
                      stroke="currentColor"
                      d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/use-hirer/hirer"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100"
                >
                  <span className="sr-only">Github</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-gray-600 transition-colors group-hover:text-black"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/usehirer"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-gray-600 transition-colors group-hover:text-[#0077b5]"
                  >
                    <path
                      fill="currentColor"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
