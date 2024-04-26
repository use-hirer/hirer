import { validateRequest } from "@/lib/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type ResumeRespnseType = {
  name: string;
  email: string;
  phone_number: string;
  location: string;
  years_of_experience: string;
  linkedin_profile_url: string;
  personal_website_url: string;
};

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(request: NextRequest) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(1, "60 s"),
  });

  if (process.env.NODE_ENV === "production") {
    const ip = headers().get("x-forwarded-for");
    const { success } = await ratelimit.limit(ip as string);

    if (!success) {
      return new Response(null, {
        status: 429,
        statusText:
          "Too Many Requests. You can only upload a logo every 60 seconds.",
      });
    }
  }

  const data = await request.formData();
  let body = Object.fromEntries(data);

  const file = await (body.file as File).arrayBuffer();

  const putObjectCommand = new PutObjectCommand({
    Bucket: "hirer-assets",
    Key: "/organisation/",
    Body: (await (body.file as File).arrayBuffer()) as Buffer,
    ContentType: "application/pdf",
  });

  return NextResponse.json(body);
}
