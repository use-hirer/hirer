"use server";

import prisma from "@console/lib/prisma";
import { sendVerificationRequest } from "@console/utils/send-verification-request";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";

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
