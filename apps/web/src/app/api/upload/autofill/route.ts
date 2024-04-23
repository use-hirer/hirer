import { BedrockChat } from "@langchain/community/chat_models/bedrock/web";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type ResumeRespnseType = {
  name: string;
  email: string;
  phone_number: string;
  location: string;
  years_of_experience: string;
  linkedin_profile_url: string;
  personal_website_url: string;
};

export async function POST(request: NextRequest) {
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(2, "60 s"),
  });

  if (process.env.NODE_ENV === "production") {
    const ip = headers().get("x-forwarded-for");
    const { success } = await ratelimit.limit(ip as string);

    if (!success) {
      return new Response(null, {
        status: 429,
        statusText:
          "Too Many Requests. You can only upload 2 resumes every 60 seconds.",
      });
    }
  }

  const data = await request.formData();
  let body = Object.fromEntries(data);

  const loader = new PDFLoader(body.file);
  const docs = await loader.load();

  const model = new BedrockChat({
    model: "anthropic.claude-3-haiku-20240307-v1:0",
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    temperature: 0.9,
    maxTokens: 4096,
  });

  const prompt = `You are a CV/Resume analysis bot. You will be provided a resume below. 
  
  {resume}
  Your task is to analyze the resume below and provide the following information:

<Information>
- Name
- Email
- Phone Number
- Location
- Years of Experience
- LinkedIn Profile URL
- Personal Website URL
</Information>

You must always output in the following JSON format:

{{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone_number": "123-456-7890",
  "location": "New York, NY",
  "years_of_experience": "5+ years",
  "linkedin_profile_url": "https://www.linkedin.com/in/johndoe",
  "personal_website_url": "https://johndoe.com"
}}
  `;

  const template = PromptTemplate.fromTemplate(prompt);
  const outputParser = new StringOutputParser();
  const chain = RunnableSequence.from([template, model, outputParser]);

  const result = await chain.invoke({
    resume: JSON.stringify(docs),
  });

  return NextResponse.json(JSON.parse(result));
}
