import { validateRequest } from "@/lib/auth";
import { nanoid } from "@/lib/functions/nanoid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import prisma from "@hirer/database";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type LogoAddPayload = {
  orgId: string;
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

  const payload: LogoAddPayload = JSON.parse(body.data as string);

  const org = await prisma.team.findUnique({
    where: { slug: payload.orgId },
    select: {
      id: true,
      members: {
        where: {
          userId: user.id,
        },
      },
    },
  });

  if (!org || !org.members) {
    return new Response(null, {
      status: 404,
      statusText: "Team not found.",
    });
  }

  const fileExtension = (body.file as File).name.split(".").pop();

  const key = `organisations/${org.id}/logo-${nanoid()}.${fileExtension}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: "hirer-assets",
    Key: key,
    Body: (await (body.file as File).arrayBuffer()) as Buffer,
  });

  await s3.send(putObjectCommand);

  await prisma.team.update({
    where: { slug: payload.orgId },
    data: {
      avatar: `https://assets.hirer.so/${key}`,
    },
  });

  return NextResponse.json(JSON.stringify({ success: true }));
}
