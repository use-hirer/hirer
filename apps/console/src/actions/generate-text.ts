"use server";

import { BedrockChat } from "@langchain/community/chat_models/bedrock/web";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const model = new BedrockChat({
  model: "anthropic.claude-3-sonnet-20240229-v1:0",
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxTokens: 4096,
});

const prompt = `
You are a job description generator. You will be provided with a {job_title} and {location}, and your task is to generate an engaging, professional job description for that role.

The job description should include:
- A brief overview of the role and its primary responsibilities 
- The key qualifications and skills required
- The company culture and benefits (you can make up details as needed)
- A call to action for qualified candidates to apply

Write the job description in a tone that matches the seniority and type of role. For example, use a more formal tone for senior executive positions and a more casual, energetic tone for creative or startup roles.

If the {location} includes multiple options, mention that the role can be in any of those locations or remote. If the {location} is empty, do not mention a location.

The job description should be 4-6 paragraphs long, with a compelling headline at the top that includes the {job_title}.

At the end, summarize the key highlights of the role and company, and provide a clear call-to-action for candidates to apply.
`;

export async function GenerateJobDescription(
  jobTitle: string,
  location: string
): Promise<string> {
  const template = PromptTemplate.fromTemplate(prompt);
  const outputParser = new StringOutputParser();
  const chain = RunnableSequence.from([template, model, outputParser]);

  const result = await chain.invoke({
    job_title: jobTitle,
    location: location,
  });

  return result;
}
