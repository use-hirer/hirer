"use client";

import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import React from "react";

const tabs = [
  { title: "General" },
  { title: "Team", href: "team" },
  { title: "Domains", href: "domains" },
  { title: "Billing", href: "billing" },
  { title: "Support", href: "support" },
];

const TabGroup: React.FC<{ parallelRoutesKey?: string }> = ({}) => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.href}
          href={tab.href}
          title={tab.title}
          parallelRoutesKey={segment}
        />
      ))}
    </nav>
  );
};

const Tab: React.FC<{
  href: string | undefined;
  title: string;
  parallelRoutesKey?: string | null;
}> = ({ href, title, parallelRoutesKey }) => {
  const params = useParams() as { slug: string };
  const path = `/${params.slug}/settings/` + (href ? href : "");
  const isActive =
    // Example home pages e.g. `/layouts`
    (!href && parallelRoutesKey === null) ||
    parallelRoutesKey === href ||
    // Nested pages e.g. `/layouts/electronics`
    parallelRoutesKey === href;

  if (isActive) {
    return (
      <Link href={path} className="font-semibold text-primary">
        {title}
      </Link>
    );
  }

  return <Link href={path}>{title}</Link>;
};

export default TabGroup;
