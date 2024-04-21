import { parse } from "@/lib/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getSubdomain } from "./lib/functions/domains";

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
  const { domain, fullPath, path, fullKey } = parse(req);

  // rewrites for app pages
  if (CONSOLE_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(
      new URL(`/console.hirer.so${fullPath === "/" ? "" : fullPath}`, req.url)
    );
  }

  // TODO: Move this to page, not middleware.
  // Need to store in Redis, Job URL, which will have keys ord_id & job_id.

  if (domain.includes("hirer.so") || domain.includes("localhost:3000")) {
    const orgSlug = getSubdomain(domain);
    // const orgId = kv.get(orgSlug)
    // const jobSlug = getSlug(...)
    // const jobId = kv.get(`${orgId}:${jobSlug}`)
    // recordClick({req, org_id: orgId, job_id: jobId, url: fullPath })
  }

  // ev.waitUntil(recordClick({ req, org_id: "123", job_id: "123", url: domain }));

  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
}
