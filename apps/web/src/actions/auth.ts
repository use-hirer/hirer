"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@hirer/database";
import { redirect } from "next/navigation";

export async function authCheck() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  if (!user.onboarded) {
    if (!user.data.userOnboarding) {
      return redirect("/onboarding");
    }

    const userTeams = await prisma.user.findUnique({
      where: { id: user.id },
      include: { _count: { select: { teams: true } } },
    });

    if (userTeams && userTeams._count.teams === 0) {
      return redirect("/onboarding/company");
    }
  }

  return user;
}
