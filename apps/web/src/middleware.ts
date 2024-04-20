import { parse } from "@/lib/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

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

  // console.hirer.so
  if (CONSOLE_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(
      new URL(`/console.hirer.so${fullPath === "/" ? "" : fullPath}`, req.url)
    );
  }

  // job boards (i.e. acme-inc.hirer.so)
  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
}
