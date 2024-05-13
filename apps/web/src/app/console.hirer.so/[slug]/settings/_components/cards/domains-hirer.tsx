"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hirer/ui/card";
import { Link as LinkIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const DomainsHirerCard: React.FC = () => {
  const params = useParams() as { slug: string };

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Domains</CardTitle>
        <CardDescription>
          These domains are the public facing URLs for your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <Link
            className="text-md hover:text-blue-500 font-medium"
            href={`https://${params.slug}.hirer.so`}
            target="_blank"
            rel="noreferrer"
          >
            {params.slug}.hirer.so
          </Link>
          <LinkIcon size={18} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainsHirerCard;
