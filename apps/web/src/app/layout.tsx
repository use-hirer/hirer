import { Providers } from "@/components/providers";
import { cn } from "@hirer/ui";
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hirer - Your Hiring Companion",
  description:
    "AI-driven hiring platform for efficient interviews, tailored questions, and enhanced, bias-reduced candidate assessments.",
  metadataBase: new URL(process.env.AUTH_URL),
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={cn("bg-zinc-50 font-sans antialiased", GeistSans.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
