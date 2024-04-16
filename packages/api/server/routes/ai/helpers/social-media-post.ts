"use server";

import { BedrockChat } from "@langchain/community/chat_models/bedrock/web";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(2, "60 s"),
});

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

const prompt = `
<Example>
🚀 Exciting opportunity alert! 🚀

We're hiring a talented Frontend Engineer to join our innovative team at Acme Inc. 🌟

As a Frontend Engineer, you'll play a crucial role in building and maintaining our cutting-edge web applications. If you're passionate about crafting seamless user experiences and love working with modern frontend technologies, this is the perfect role for you! 💻

Key responsibilities:
✅ Develop and optimize responsive web applications
✅ Collaborate with cross-functional teams to deliver high-quality code
✅ Implement engaging user interfaces and interactions

Requirements:
👩‍💻 Strong proficiency in HTML, CSS, and JavaScript
👩‍💻 Experience with frontend frameworks (e.g., React, Vue.js)
👩‍💻 Knowledge of web performance optimization techniques

Ready to make an impact? Apply now and join our incredible team! 🌈

📝 Apply here: https://acme-inc.hirer.so/job/fullstack-engineer

#hiring #frontend #webdevelopment #javascript #react #career #tech
</Example>
<Example>
Looking for an exciting new challenge? 🚀 Acme Inc. is hiring a Fullstack Engineer to join their team in Melbourne!

As a Fullstack Engineer, you'll be responsible for developing and maintaining robust web applications using the latest technologies. You'll have the opportunity to work on innovative projects and collaborate with a talented cross-functional team.

If you're a passionate problem-solver with experience in JavaScript, React, and Node.js, we want to hear from you!

Apply now: https://acme-inc.hirer.so/job/fullstack-engineer

#FullstackEngineer #MelbourneJobs #WebDevelopment #TechCareer #AcmeInc
</Example>


You are a social media post generator specifically for jobs. You will be provided with a {job_title} and {location}, and your task is to generate an engaging, social media post that cannot be longer than {length}.

Rules:

- Include the {link} to the job.
- Ensure that is of length: {length}
- If there is additional information/instructions: {additionalInformation}, also consider this when writing the social media post.
- Format the post with proper spacing, line breaks, and emojis to make it visually appealing and easy to read. The post should be concise and engaging, encouraging potential candidates to apply for the position.
`;

interface GenerateSocialMediaPostProps {
  jobTitle: string;
  location: string;
  additionalInformation: string;
  length: number;
  link: string;
}

export async function GenerateSocialMediaPost({
  jobTitle,
  location,
  additionalInformation,
  length,
  link,
}: GenerateSocialMediaPostProps): Promise<string> {
  try {
    if (process.env.NODE_ENV === "production") {
      const ip = headers().get("x-forwarded-for");
      const { success } = await ratelimit.limit(ip as string);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "You can only generate two social media posts every 60 seconds.",
        });
      }
    }

    const template = PromptTemplate.fromTemplate(prompt);
    const outputParser = new StringOutputParser();
    const chain = RunnableSequence.from([template, model, outputParser]);

    const result = await chain.invoke({
      job_title: jobTitle,
      location: location,
      additionalInformation: additionalInformation,
      length: String(length),
      link: link,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "An error occurred when trying to generate the social media post.",
      cause: e,
    });
  }
}
