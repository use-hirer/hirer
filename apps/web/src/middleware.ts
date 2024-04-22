import { parse } from "@/lib/middleware";
import { kv } from "@vercel/kv";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getSubdomain } from "./lib/functions/domains";
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

    let jobId = path.replace("/job/", "").split("-")[0];
    const orgId = (await kv.get(orgSlug)) as string;
    const idRegex: RegExp = /^[0-9]{12}$/;

    if (orgId && (idRegex.test(jobId) || path === "/")) {
      if (path === "/") {
        jobId = "";
      }

      ev.waitUntil(
        recordClick({
          req,
          org_id: orgId,
          job_id: jobId,
          url: domain + fullPath,
        })
      );
    }
  }

  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
}
