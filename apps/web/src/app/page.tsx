import { authCheck } from "@/actions/auth";
import prisma from "@hirer/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function RootPage() {
  const user = await authCheck(true);

  const slug = cookies().get("scope")?.value;

  if (slug) {
    return redirect(`/${slug}/`);
  }

  console.log(slug);

  const team = await prisma.team.findFirst({
    where: { members: { every: { userId: { equals: user.id } } } },
    select: { slug: true },
  });

  console.log(team);

  return redirect(`/${team?.slug}/`);
}
