"use client";

import CollapseProvider from "@console/context/collapse-context";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <SessionProvider {...props}>
      <CollapseProvider>{children}</CollapseProvider>
    </SessionProvider>
  );
}
