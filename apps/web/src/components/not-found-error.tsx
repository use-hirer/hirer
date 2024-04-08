"use client";

import { Button } from "@hirer/ui/button";
import { SmileyXEyes, Spinner } from "@phosphor-icons/react";
import { useState } from "react";

interface NotFoundErrorProps {
  email: string;
  resetCookies: () => Promise<void>;
}

const NotFoundError: React.FC<NotFoundErrorProps> = ({
  email,
  resetCookies,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full flex items-center justify-center flex-col">
      <SmileyXEyes size={64} />
      <div className="font-bold text-2xl pt-4">Not Found</div>
      <div className="font-normal text-zinc-500">
        You are logged in as <span className="font-semibold">{email}</span>.
      </div>
      <Button
        className="mt-4 flex gap-1"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await resetCookies();
        }}
      >
        {loading && <Spinner className="animate-spin" />} Return Home
      </Button>
    </div>
  );
};

export default NotFoundError;
