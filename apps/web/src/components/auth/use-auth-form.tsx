"use client";

import * as React from "react";

import { emailLogin } from "@/app/console.hirer.so/login/actions";
import { cn } from "@hirer/ui";
import { Button } from "@hirer/ui/button";
import { Input } from "@hirer/ui/input";
import { Label } from "@hirer/ui/label";
import { CircleNotch } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GoogleIcon from "../icons/google";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [selectedMethod, setSelectedMethod] = React.useState<
    "Email" | "Google" | null
  >(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSelectedMethod("Email");
    setIsLoading(true);

    try {
      await emailLogin(email);
      router.push("/login/verify-request");
    } catch (e) {
      toast.error("An error ocurred logging you in! Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && selectedMethod === "Email" && (
              <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={async () => {
          setSelectedMethod("Google");
          setIsLoading(true);
          window.location.href = "/api/auth/google";
        }}
      >
        {isLoading && selectedMethod === "Google" ? (
          <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="h-4 w-4 mr-2" />
        )}
        Google
      </Button>
    </div>
  );
}
