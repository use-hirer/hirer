"use client";

import { api } from "@/lib/api/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hirer/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

interface OrganisationLogoCardProps {
  logo: string | null;
}

const OrganisationLogoCard: React.FC<OrganisationLogoCardProps> = ({
  logo,
}) => {
  const params = useParams() as { slug: string };
  const utils = api.useUtils();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "data",
      JSON.stringify({
        orgId: params.slug,
      })
    );

    const result = await fetch("/api/upload/org-logo", {
      method: "POST",
      body: formData,
    });

    utils.settings.getGeneral.invalidate();
  };

  return (
    <Card className="rounded-md border-neutral-200 flex-grow-0 shadow-sm">
      <CardHeader>
        <CardTitle>Organisation Logo</CardTitle>
        <CardDescription>
          Logo will be displayed on the homepage of your organisation and on
          emails.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          id="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple={false}
          className="hidden"
          onChange={handleFileChange}
        />
        {logo || selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            <Image
              alt="Logo"
              src={logo ? logo : URL.createObjectURL(selectedFile!)}
              width={100}
              height={70}
            />
          </div>
        ) : (
          <div
            className="border border-dashed border-slate-300 rounded-md p-4 w-40 h-20 flex justify-center items-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-xs font-light text-slate-500">
              Click to add logo
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t py-4 bg-zinc-50 flex justify-start rounded-b-md">
        <div className="text-zinc-500 text-sm">
          A logo is optional but strongly recommended.
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrganisationLogoCard;
