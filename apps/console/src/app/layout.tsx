import { Providers } from "@console/components/providers";
import { cn } from "@hirer/ui";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hirer - Your Hiring Companion",
  description:
    "AI-driven hiring platform for efficient interviews, tailored questions, and enhanced, bias-reduced candidate assessments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-zinc-50 font-sans antialiased overflow-y-hidden",
          GeistSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
