"use server";

import { cookies } from "next/headers";

export default async function resetScopeCookie(slug: string) {
  cookies().set("scope", slug as string, {
    maxAge: 60 * 60 * 24 * 365,
    secure: true,
    sameSite: "lax",
    priority: "medium",
  });
}
