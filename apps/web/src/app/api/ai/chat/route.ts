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
      //   const model = new BedrockChat({
      //     model: "anthropic.claude-3-haiku-20240307-v1:0",
      //     region: process.env.AWS_REGION,
      //     credentials: {
      //       accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      //     },
      //     temperature: 0.9,
      //     maxTokens: 8192,
      //   });

      //   return model.stream(forwardedProps.messages);

      return "🚧 We're currently developing our AI chat functionality. Please check back soon!";
    })
  );
}
