"use client";

import { Browsers } from "@phosphor-icons/react";
import DomainsHirerCard from "./cards/domains-hirer";

interface SettingsViewProps {}

const DomainsSettingsView: React.FC<SettingsViewProps> = ({}) => {
  return (
    <div className="flex gap-6 flex-col">
      <DomainsHirerCard />
      <div className="shadow-sm border p-4 bg-zinc-50 rounded-md border-dashed flex items-center justify-center min-h-48 text-zinc-500 text-sm flex-col gap-2">
        <Browsers size={24} />
        Custom domains are not yet available.
      </div>
    </div>
  );
};

export default DomainsSettingsView;
