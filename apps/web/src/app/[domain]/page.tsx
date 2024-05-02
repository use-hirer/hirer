import HirerLogo from "@/components/icons/hirer-logo";
import { api } from "@/lib/api/server";
import { getSubdomain } from "@/lib/functions/domains";
import JobsList from "@/modules/public/jobs-list";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export async function generateMetadata(
  { params }: { params: { domain: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = getSubdomain(params.domain);
  const org = await api.public.getOrganisation({ id: slug as string });

  // TODO: Handle 404 case

  return {
    title: org?.name + ": Careers",
  };
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
          {org.avatar !== null ? (
            <Image
              src={org.avatar as string}
              alt={`${org.name} Logo`}
              width={100}
              height={50}
            />
          ) : (
            <div className="font-extrabold text-3xl text-black">{org.name}</div>
          )}
        </div>
        {org.bio && (
          <div className="bg-white shadow-sm container mt-3 rounded-2xl p-4 max-w-[1000px] border">
            <div className="font-bold text-xl p-2">About Us</div>
            <div className="flex flex-col gap-4 text-sm p-2">
              <Markdown className="prose max-w-none font text-sm">
                {org?.bio}
              </Markdown>
            </div>
          </div>
        )}
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
