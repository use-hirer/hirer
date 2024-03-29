import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hirer/ui/dropdown-menu";
import { Copy, DotsThree } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@tremor/react";
import Link from "next/link";
import React from "react";

type Candidate = {
  name: string;
  stage: string;
  contact: string;
  applicationDate: string;
  position: string;
};

const candidatesData: Candidate[] = [
  {
    name: "Nick Mandylas",
    stage: "New",
    contact: "nickmandylas@gmail.com",
    applicationDate: "04 Jan 2024",
    position: "Senior Software Engineer",
  },
  {
    name: "Salma Sanad",
    stage: "Screener",
    contact: "salma.sanad@yahoo.com",
    applicationDate: "03 Jan 2024",
    position: "Head of HR",
  },
  {
    name: "Alfred Kouris",
    stage: "New",
    contact: "alfred.kouris@gmail.com",
    applicationDate: "03 Jan 2024",
    position: "Frontend Engineer",
  },
  {
    name: "Stefan Tsgaris",
    stage: "New",
    contact: "stefan.tsag@gmail.com",
    applicationDate: "01 Jan 2024",
    position: "Head of HR",
  },
];

interface CandidatesTableProps {}

const CandidatesTable: React.FC<CandidatesTableProps> = () => {
  return (
    <table className="min-w-full border-separate border-spacing-0 mt-2">
      <thead className="bg-gray-100/50 shadow-sm">
        <tr>
          <th className="pl-2 py-2.5 text-left text-sm font-semibold text-muted-foreground border border-r-0 rounded-l-sm">
            Candidate
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Stage
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Contact
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Applied
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Position
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 rounded-r-sm"></th>
        </tr>
      </thead>
      <tbody>
        {candidatesData.map((candidate, index) => (
          <tr key={index} className="border-b border-b-red-700">
            <td className="px-2 py-3 text-left text-sm border-b font-medium select-none">
              <Link href={"/"}>{candidate.name}</Link>
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {candidate.stage === "New" ? (
                <Badge className="rounded-md" color="emerald">
                  New
                </Badge>
              ) : (
                <Badge className="rounded-md" color="blue">
                  Screener
                </Badge>
              )}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {candidate.contact}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {candidate.applicationDate}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {candidate.position}
            </td>
            <td className="px-2 py-4 text-left text-sm border-b flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsThree size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-1">
                    <div>Copy Link</div>
                    <Copy />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidatesTable;
