import HirerLogo from "@/components/icons/hirer-logo";
import { api } from "@/lib/api/server";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export async function generateMetadata(
  { params }: { params: { domain: string; slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = getSubdomain(params.domain);
  const job = await api.public.getJob({
    jobId: params.slug as string,
    orgId: slug,
  });

  return {
    title: job?.title,
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

export default async function JobPublicPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const slug = getSubdomain(params.domain);
  const job = await api.public.getJob({
    jobId: params.slug as string,
    orgId: slug,
  });

  if (!job) {
    return notFound();
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mt-8 p-2 max-w-[1000px]">
        <div className="flex justify-center">
          <Link href={"/"}>
            <Image
              src={"/acme-logo.png"}
              alt="ACME Inc Logo"
              width={100}
              height={50}
            />
          </Link>
        </div>
        <div className="font-bold text-xl p-2 items-center w-full flex flex-col">
          <div>{job?.title}</div>
          <div className="text-xs font-normal text-zinc-600">
            {job?.location}
          </div>
        </div>
        <div className="bg-white shadow-sm container mt-3 rounded-2xl p-4 max-w-[1000px]">
          <div className="font-bold text-xl p-2">Description</div>
          <div className="flex flex-col gap-4 text-sm p-2">
            <Markdown className="prose max-w-none font text-sm">
              {job?.description}
            </Markdown>
          </div>
        </div>
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
