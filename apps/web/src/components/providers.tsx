"use client";

import CollapseProvider from "@/context/collapse-context";
import { TRPCReactProvider } from "@/lib/api/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <CollapseProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </CollapseProvider>
  );
}
