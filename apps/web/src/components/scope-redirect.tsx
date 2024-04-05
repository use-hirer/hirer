"use client";

import getDefaultTeam from "@/actions/get-default-team";
import { SpinnerGap } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ScopeRedirectProps {
  userId: string;
}

export default function ScopeRedirect({ userId }: ScopeRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const fetchDefaultTeam = async () => {
      const slug = await getDefaultTeam(userId);
      if (slug) {
        router.push(`/${slug}`);
      }
    };

    fetchDefaultTeam();
  }, [router, userId]);

  return (
    <div className="flex h-[calc(100dvh)] w-full items-center justify-center">
      <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-md font-extrabold animate-spin">
        <SpinnerGap />
      </div>
    </div>
  );
}
