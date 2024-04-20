import { recordClick } from "@/lib/tinybird";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { org_id, job_id } = await req.json();
  await recordClick({ job_id, org_id, req });

  return new Response(null, { status: 204 });
}
