"use client";

import { carousel } from "@/lib/constants/carousel";
import { CheckCircle } from "@phosphor-icons/react";

export default function FeatureMarquee() {
  return (
    <div>
      <div className="lg:text-center">
        <p className="mt-8 text-4xl tracking-tighter text-blue-950">
          Comprehensive suite of recruiting{" "}
          <span className="md:block md:text-transparent md:bg-clip-text md:bg-gradient-to-r from-zinc-400 to-zinc-600">
            services and solutions for your needs
          </span>
        </p>
        <p className="max-w-sm mt-4 text-base text-gray-700 lg:mx-auto lg:text-base">
          Explore a wide range of hiring tools, features, and support for your
          businesses goals
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
  );
}
