"use client";

import { List } from "@phosphor-icons/react/dist/ssr";
// import { Metadata } from "next";
import { signOut } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Hirer: Dashboard",
// };

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          className="bg-zinc-100 rounded-full p-2 md:hidden"
          onClick={() => signOut()}
        >
          <List weight="bold" size={20} />
        </button>
        <div className="font-extrabold text-xl">Home</div>
      </div>
    </>
  );
}
