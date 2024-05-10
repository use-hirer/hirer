import HirerLogo from "@/components/icons/hirer-logo";
import { Button } from "@hirer/ui/button";
import Link from "next/link";
import DemoVideo from "./_components/demo-video";
import FeatureMarquee from "./_components/feature-marquee";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";

export default function HirerPage() {
  return (
    <div className="overflow-y-auto h-screen">
      <div className="container bg-zinc-50 px-2 md:px-8">
        <div className="flex py-4 px-2 md:px-8 justify-between items-center">
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
            <Hero />
          </div>
          <div className="pt-16">
            <DemoVideo />
          </div>
          <div className="py-8">
            <FeatureMarquee />
          </div>
          <div className="pb-16">
            <Pricing />
          </div>
        </div>
        <div className="py-8 px-2 md:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
