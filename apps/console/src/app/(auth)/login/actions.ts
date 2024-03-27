"use server";

import prisma from "@console/lib/prisma";
import { sendVerificationRequest } from "@console/utils/send-verification-request";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { generateId } from "lucia";
import { headers } from "next/headers";
import { TimeSpan, createDate } from "oslo";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, "30 s"),
});

async function generateEmailVerificationToken(
  userId: string,
  email: string
): Promise<string> {
  await prisma.verificationCode.deleteMany({
    where: {
      userId: userId,
    },
  });

  const tokenId = generateId(40);

  await prisma.verificationCode.create({
    data: {
      userId: userId,
      email: email,
      code: tokenId,
      expiresAt: createDate(new TimeSpan(2, "h")), // 15 minutes
    },
  });

  return tokenId;
}

export async function emailLogin(email: string) {
  try {
    if (process.env.NODE_ENV === "production") {
      const ip = headers().get("x-forwarded-for");
      const { success } = await ratelimit.limit(ip as string);

      if (!success) {
        throw Error("Rate limit hit. Please wait 30 seconds.");
      }
    }

    const user = await prisma.user.upsert({
      where: {
        email: email,
      },
      create: {
        email: email,
        emailVerified: false,
      },
      update: {},
    });

    const verificationToken = await generateEmailVerificationToken(
      user.id,
      email
    );

    const verificationLink = `${process.env.AUTH_URL}/api/auth/email/verify?token=${verificationToken}&email=${email}`;

    await sendVerificationRequest({ email: email, url: verificationLink });
  } catch (e) {
    console.log(e);
  }
}
