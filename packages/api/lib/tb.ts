import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

if (!process.env.TINYBIRD_API_KEY) throw new Error("Missing TINYBIRD_API_KEY");

export const tb = new Tinybird({
  token: process.env.TINYBIRD_API_KEY as string,
  baseUrl: "https://api.us-east.aws.tinybird.co/",
});

export const trackEvent = tb.buildIngestEndpoint({
  datasource: "org_activity",
  event: z.object({
    date: z.date(),
    org_id: z.string(),
    user_id: z.string(),
    event: z.string(),
    event_data: z.string().optional().default(""),
  }),
});

export const getEventsByOrgId = tb.buildPipe({
  pipe: "org_activity_view",
  parameters: z.object({
    org_id: z.string(),
    page: z.number(),
    page_size: z.number(),
  }),
  data: z.object({
    date: z.string(),
    event: z.string(),
    event_data: z.string(),
    org_id: z.string(),
    user_id: z.string(),
  }),
});
