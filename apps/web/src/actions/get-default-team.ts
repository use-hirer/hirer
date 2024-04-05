"use server";

import prisma from "@hirer/database";
import { cookies } from "next/headers";

export default async function getDefaultTeam(userId: string) {
  const team = await prisma.teamMember.findFirst({
    where: { userId: userId },
    include: {
      team: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!team?.team.slug) {
    return null;
  }

  cookies().set("scope", team.team.slug as string, {
    maxAge: 60 * 60 * 24 * 365,
    secure: true,
    sameSite: "lax",
    priority: "medium",
  });

  return team?.team.slug;
}
