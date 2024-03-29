"use server";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function authCheck() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return user;
}
