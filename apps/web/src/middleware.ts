import { parse } from "@/lib/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { recordClick } from "./lib/tinybird";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

const CONSOLE_HOSTNAMES = new Set([
  "console.hirer.so",
  "console.localhost:3000",
]);

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, fullPath, path } = parse(req);

  // rewrites for app pages
  if (CONSOLE_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(
      new URL(`/console.hirer.so${fullPath === "/" ? "" : fullPath}`, req.url)
    );
  }

  ev.waitUntil(recordClick({ req, id: "123", url: domain }));

  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
}
