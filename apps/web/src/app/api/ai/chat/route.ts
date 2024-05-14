import { validateRequest } from "@/lib/auth";
import { S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

import { CopilotRuntime, LangChainAdapter } from "@copilotkit/backend";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(request: NextRequest) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const copilotKit = new CopilotRuntime();

  return copilotKit.response(
    request,
    new LangChainAdapter(async (forwardedProps) => {
      return "🚧 We're currently developing our AI chat functionality. Please check back soon!";
    })
  );
}
