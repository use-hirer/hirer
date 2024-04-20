import HirerLogo from "@/components/icons/hirer-logo";
import { api } from "@/lib/api/server";
import JobsList from "@/modules/public/jobs-list";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { domain: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = getSubdomain(params.domain);
  const org = await api.public.getOrganisation({ id: slug as string });

  return {
    title: org?.name + ": Careers",
  };
}

function getSubdomain(domain: string) {
  const [domainWithoutPort] = domain.split(":");
  const decodedDomain = decodeURIComponent(domainWithoutPort);
  const dotIndex = decodedDomain.indexOf(".");

  if (dotIndex !== -1) {
    return decodedDomain.substring(0, dotIndex);
  } else {
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
    <div className="h-full overflow-y-auto">
      <div className="container mt-8 p-2 max-w-[1000px]">
        <div className="flex justify-center">
          <Image
            src={"/acme-logo.png"}
            alt="Amazon Logo"
            width={100}
            height={50}
          />
        </div>
        <div className="bg-white shadow-sm container mt-3 rounded-2xl p-4 max-w-[1000px]">
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
        <JobsList org={org} />
        <Link
          className="flex justify-center gap-2 items-center py-6 cursor-pointer"
          href={"https://hirer.so"}
        >
          <div className="text-xs">Powered by</div>
          <div className="flex items-center">
            <HirerLogo width={70} />
          </div>
        </Link>
      </div>
    </div>
  );
}
