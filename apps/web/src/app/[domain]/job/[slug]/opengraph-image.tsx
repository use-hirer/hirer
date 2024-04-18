/* eslint-disable @next/next/no-img-element */
import { api } from "@/lib/api/server";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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

export default async function Image({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const slug = getSubdomain(params.domain);
  const job = await api.public.getJob({
    jobId: params.slug as string,
    orgId: slug,
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            fontSize: 100,
          }}
        >
          💼
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: "24",
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          {job?.title}
        </div>
      </div>
    ),
    {
      ...size,
      emoji: "twemoji",
    }
  );
}
