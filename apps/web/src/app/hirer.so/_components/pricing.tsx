"use client";

import { Button } from "@hirer/ui/button";
import { Check } from "@phosphor-icons/react";

const features = {
  free: [
    { title: "Unlimited Jobs" },
    { title: "Public Company & Job Board Page" },
    { title: "Applicant Tracking System" },
    { title: "Realtime Analytics" },
    { title: "Custom Subdomain (e.g. acme.hirer.so)" },
    { title: "AI CV/Resume Assessment" },
  ],
  pro: [
    { title: "Team Management (Unlimited Users)" },
    { title: "API Access" },
    { title: "Custom Domains" },
    { title: "Priority Support" },
  ],
  proUpcoming: [
    { title: "AI Screening/Video Assessment" },
    { title: "AI Interview Platform" },
    { title: "Interview Scheduler" },
    { title: "Candidate Background Verification" },
    { title: "Many More Features" },
  ],
  enterprise: [
    { title: "Custom SAML + OIDC" },
    { title: "Private Cloud" },
    { title: "Custom Feature Development" },
    { title: "Dedicated Support" },
  ],
};

export default function Pricing() {
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center gap-6">
        <h2 className="text-4xl tracking-tighter text-neutral-text-primary w-full lg:max-w-lg lg:text-center">
          Save up to <span className="text-green-600 font-normal">90%</span>{" "}
          over any other tool when you&nbsp;
          <span className="md:text-transparent md:bg-clip-text md:bg-gradient-to-r from-zinc-400 to-zinc-600">
            switch to Hirer
          </span>
          .
        </h2>
      </div>
      <div className="w-full relative flex flex-wrap lg:flex-nowrap gap-6 pt-8">
        <div className="flex flex-col w-full p-5 py-6 rounded-md space-y-8 border">
          <div className="space-y-1">
            <div className="relative flex items-center gap-2">
              <div className="text-4xl font-medium">Free</div>
            </div>
            <div className="text-sm">All the features you need to Hire</div>
          </div>
          <div className="relative flex items-end gap-1">
            <div className="text-4xl font-medium">$0</div>
            <div className="text-md font-normal text-zinc-500">forever</div>
          </div>
          <div className="flex-shrink-0 mt-auto">
            <a href="https://console.hirer.so">
              <Button variant={"default"} className="w-full h-11 shadow-none">
                Sign up
              </Button>
            </a>
          </div>
          <div className="h-full text-[#11181C] space-y-4">
            <div>Out of the box</div>
            <ul
              role="list"
              className="space-y-4 text-sm text-neutral-text-secondary"
            >
              {features.free.map((feature) => (
                <li
                  key={feature.title}
                  className="flex gap-x-2 items-center group relative "
                >
                  <div className="bg-green-100 text-green-600 rounded-full flex-shrink-0 w-6 h-6 flex justify-center items-center">
                    <Check />
                  </div>
                  <div>{feature.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full p-5 py-6 rounded-md space-y-8 border">
          <div className="space-y-1">
            <div className="relative flex items-center gap-2">
              <div className="text-4xl font-medium">Pro</div>
            </div>
            <div className="text-sm">
              The best recruiting features for any business
            </div>
          </div>
          <div className="relative flex items-end gap-1">
            <div className="text-4xl font-medium">$12</div>
            <div className="text-md font-normal text-zinc-500">/month</div>
          </div>
          <div className="flex-shrink-0 mt-auto">
            <Button variant={"outline"} className="w-full h-11 shadow-none">
              Coming Soon
            </Button>
          </div>
          <div className="h-full text-[#11181C] space-y-4">
            <div>Everything in Free and</div>
            <ul
              role="list"
              className="space-y-4 text-sm text-neutral-text-secondary"
            >
              {features.pro.map((feature) => (
                <li
                  key={feature.title}
                  className="flex gap-x-2 items-center group relative "
                >
                  <div className="bg-green-100 text-green-600 rounded-full flex-shrink-0 w-6 h-6 flex justify-center items-center">
                    <Check />
                  </div>
                  <div>{feature.title}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full text-[#11181C] space-y-4">
            <div>Upcoming Features</div>
            <ul
              role="list"
              className="space-y-4 text-sm text-neutral-text-secondary"
            >
              {features.proUpcoming.map((feature) => (
                <li
                  key={feature.title}
                  className="flex gap-x-2 items-center group relative "
                >
                  <div className="bg-zinc-100 text-zinc-600 rounded-full flex-shrink-0 w-6 h-6 flex justify-center items-center">
                    <Check />
                  </div>
                  <div>{feature.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full p-5 py-6 rounded-md space-y-8 border">
          <div className="space-y-1">
            <div className="relative flex items-center gap-2">
              <div className="text-4xl font-medium">Enterprise</div>
            </div>
            <div className="text-sm">All the features you need to Hire</div>
          </div>
          <div className="relative flex items-end gap-1">
            <div className="text-4xl font-medium">Talk to Us</div>
          </div>
          <div className="flex-shrink-0 mt-auto">
            <a href="https://cal.com/hirer/15min">
              <Button variant={"outline"} className="w-full h-11 shadow-none">
                Schedule a Call
              </Button>
            </a>
          </div>
          <div className="h-full text-[#11181C] space-y-4">
            <div>Out of the box</div>
            <ul
              role="list"
              className="space-y-4 text-sm text-neutral-text-secondary"
            >
              {features.enterprise.map((feature) => (
                <li
                  key={feature.title}
                  className="flex gap-x-2 items-center group relative "
                >
                  <div className="bg-green-100 text-green-600 rounded-full flex-shrink-0 w-6 h-6 flex justify-center items-center">
                    <Check />
                  </div>
                  <div>{feature.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
