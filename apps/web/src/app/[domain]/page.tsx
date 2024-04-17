import { api } from "@/lib/api/server";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function extractSubdomain(domain: string): string | null {
  // Decode the domain in case it's URL encoded
  const decodedDomain = decodeURIComponent(domain);

  // Remove any port number if present
  const domainWithoutPort = decodedDomain.split(":")[0];

  // Split the domain into parts
  const parts = domainWithoutPort.split(".");

  // Check how many parts or segments are present in the domain
  if (parts.length >= 2) {
    // The subdomain will be all parts except the last one
    return parts.slice(0, -1).join(".");
  } else {
    // This scenario occurs if there is no '.' in the domain (very unusual)
    return null;
  }
}

export default async function OrganisationPublicPage({
  params,
}: {
  params: { domain: string };
}) {
  const slug = extractSubdomain(params.domain);
  const org = await api.public.getOrganisation({ id: slug as string });

  if (!org) {
    return notFound();
  }

  return (
    <div className="container mt-8 p-2 max-w-[1000px]">
      <div className="flex justify-center">
        <Image src={"/amazon.png"} alt="Amazon Logo" width={100} height={50} />
      </div>
      <div className="bg-white shadow-sm container mt-6 rounded-2xl p-4 max-w-[1000px]">
        <div>Todo ...</div>
      </div>
      <Link
        className="flex justify-center gap-1 items-center pt-6 cursor-pointer"
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
  );
}
