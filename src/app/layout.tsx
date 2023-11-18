import { cn } from "@/lib/utils";
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
          "min-h-screen bg-zinc-50 font-sans antialiased",
          GeistSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
