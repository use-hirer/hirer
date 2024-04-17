import { api } from "@/lib/api/server";
import { Button } from "@hirer/ui/button";
import { Separator } from "@hirer/ui/separator";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function getSubdomain(domain: string) {
  // Remove the port number if present
  const [domainWithoutPort] = domain.split(":");

  // Decode the URL-encoded characters
  const decodedDomain = decodeURIComponent(domainWithoutPort);

  // Find the position of the first dot
  const dotIndex = decodedDomain.indexOf(".");

  if (dotIndex !== -1) {
    // Extract the substring from the start to the first dot
    return decodedDomain.substring(0, dotIndex);
  } else {
    // Return an empty string if no dot is found
    return "";
  }
}

export default async function OrganisationPublicPage({
  params,
}: {
  params: { domain: string };
}) {
  const slug = getSubdomain(params.domain);
  const org = await api.public.getOrganisation({ id: slug as string });

  if (!org) {
    return notFound();
  }

  return (
    <div className="h-[100dvh] overflow-y-auto">
      <div className="container mt-8 p-2 max-w-[1000px]">
        <div className="flex justify-center">
          <Image
            src={"/amazon.png"}
            alt="Amazon Logo"
            width={100}
            height={50}
          />
        </div>
        <div className="bg-white shadow-sm container mt-6 rounded-2xl p-4 max-w-[1000px]">
          <div className="font-bold text-xl p-2">About Us</div>
          <div className="flex flex-col gap-4 text-sm p-2">
            <div>
              Join us in our mission to build the largest platform for learning
              programming interactively for the{" "}
              <span className="font-bold">
                next billion aspiring developers
              </span>
              . We are building the foundations of interactive learning
              technology globally at scale, with technology and community
              working at maximum efficiency.
            </div>
            <div>
              We&apos;re an ed-tech company. We want to improve computer
              programming education ten-fold with technology. This involves:
            </div>
            <div>
              <ul>
                <li>✦ Making it cheaper globally</li>
                <li>✦ Compensating instructors for their efforts</li>
                <li>
                  ✦ Saving time of people in learning by maximum efficiency
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm container mt-6 rounded-2xl p-4 max-w-[1000px]">
          {org.jobs.map((job, index) => (
            <div key={job.id}>
              <div className="p-2">
                <div className="font-bold text-lg">{job.title}</div>
                <div className="text-xs font-normal text-zinc-600">
                  {job.location}
                </div>
              </div>
              {org.jobs.length - 1 !== index && <Separator />}
            </div>
          ))}
          <div className="flex items-center justify-center pt-4 gap-2">
            <Button variant={"ghost"} disabled>
              Back
            </Button>
            <Button variant={"outline"}>Next</Button>
          </div>
        </div>

        <Link
          className="flex justify-center gap-1 items-center py-6 cursor-pointer"
          href={"https://hirer.so"}
        >
          <div className="text-xs">Powered by</div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-md font-extrabold">
              <Sparkle size={12} />
            </div>
            <div className="font-bold text-xl ml-[2px]">Hirer</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
