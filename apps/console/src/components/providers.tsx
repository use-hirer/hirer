"use client";

import CollapseProvider from "@console/context/collapse-context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children, ...props }: ProvidersProps) {
  return <CollapseProvider>{children}</CollapseProvider>;
}
