import { ipAddress } from "@vercel/edge";
import { userAgent } from "next/server";
import { LOCALHOST_IP } from "./constants/localhost";
import { hashStringSHA256 } from "./functions/hash";

/**
 * Combine IP + UA to create a unique identifier for the user (for deduplication)
 */
export async function getIdentityHash(req: Request) {
  const ip = ipAddress(req) || LOCALHOST_IP;
  const ua = userAgent(req);
  return await hashStringSHA256(`${ip}-${ua.ua}`);
}
