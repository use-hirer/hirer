/* eslint-disable @next/next/no-img-element */
import HirerLogo from "@/components/icons/hirer-logo";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const fontData = await fetch(
    "https://assets.hirer.so/fonts/Geist-Regular.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "rgb(250 250 250)",
          height: "100%",
          width: "100%",
          fontSize: 100,
          fontFamily: '"Typewriter"',
          display: "flex",
          padding: "32px",
        }}
      >
        <div
          tw="bg-white w-full rounded-lg shadow-md flex flex-col px-8 justify-center"
          style={{ border: "1px solid #E5E5E5" }}
        >
          <HirerLogo
            width={80}
            style={{ width: "240px", height: "60px", marginBottom: "32px" }}
          />
          <h1 tw="text-8xl text-balance max-w-[800px] mb-0 mt-16">
            The Open-Source Hiring Platform
          </h1>
          <p tw="text-2xl text-balance max-w-3xl mt-8 mb-0 text-zinc-500">
            Hirer is a modern recruiting platform with customisable job board,
            real-time analytics, AI assessments, and full white-labeling.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Typewriter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
