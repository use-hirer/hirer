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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  temperature: 0.9,
  maxTokens: 8192,
}).bind({ stop: ["</JobDescription>"] });

const prompt = `
Example Descriptions:
<Example>
**Role Overview**

As a Frontend Engineer in our dynamic Melbourne-based team, you will play a pivotal role in shaping the user experience of our innovative products. You will collaborate closely with cross-functional teams to design, develop, and optimize intuitive and visually-appealing web applications that delight our customers. Your technical expertise, combined with a keen eye for design and a passion for problem-solving, will be instrumental in driving the success of our projects.

**Key Responsibilities**

- Translate design mockups and wireframes into responsive, accessible, and high-performance web interfaces
- Implement cutting-edge frontend technologies and frameworks, such as React, Vue.js, or Angular, to build scalable and maintainable codebases
- Optimize website performance, ensuring fast load times and smooth user interactions
- Collaborate with backend engineers to integrate seamless data flows and API integrations
- Participate in code reviews, provide technical guidance to junior team members, and contribute to the overall engineering best practices
- Stay up-to-date with the latest frontend development trends and technologies, and proactively identify opportunities for innovation

**Qualifications and Skills**

- Bachelor's degree in Computer Science, Information Technology, or a related field
- 10+ years of experience in frontend web development, with a strong portfolio of successful projects
- Proficiency in HTML, CSS, and JavaScript, as well as a deep understanding of modern frontend frameworks and libraries
- Excellent problem-solving skills and the ability to think critically about complex technical challenges
- Experience with responsive design, accessibility, and cross-browser compatibility
- Familiarity with build tools, version control systems, and agile development methodologies
- Strong communication and collaboration skills, with the ability to work effectively in a team environment

**Company Culture and Benefits**

At our company, we pride ourselves on fostering a dynamic, collaborative, and innovative work environment. We believe in empowering our employees to take ownership of their projects and to continuously learn and grow. You'll have the opportunity to work alongside talented professionals, participate in regular team-building activities, and enjoy a range of employee benefits, including:

- Competitive salary and performance-based bonuses
- Comprehensive health insurance and retirement savings plans
- Generous paid time off and flexible work arrangements
- Professional development opportunities, including workshops and conferences
- Modern, fully-equipped office space with a vibrant, creative atmosphere

**Apply Now**

If you're an experienced Frontend Engineer who is passionate about building exceptional user experiences, we'd love to hear from you. Please submit your resume and a brief cover letter outlining your relevant skills and experience. We're excited to explore how your talents can contribute to the success of our growing team.
</Example>

You are a job description generator. You will be provided with a {job_title} and {location}, and your task is to generate an engaging, professional job description for that role.

The job description should include:
- A brief overview of the role and its primary responsibilities 
- The key qualifications and skills required
- The company culture and benefits (you can make up details as needed)
- Each section needs a bolded heading in markdown with a new line for the content underneath.
- If there is additional information/instructions: {additionalInformation}, also consider this when writing the job description, whether in a different section or as part of existing sections, depending on the instructions.
- A call to action for qualified candidates to apply
- Do not have a title at the beginning. Only write the job description.

Write the job description in a tone that matches the seniority and type of role. For example, use a more formal tone for senior executive positions and a more casual, energetic tone for creative or startup roles.

If the {location} includes multiple options, mention that the role can be in any of those locations or remote. If the {location} is empty, do not mention a location.

The job description should be 4-6 paragraphs long. 

At the end, summarize the key highlights of the role and company, and provide a clear call-to-action for candidates to apply.
`;

interface GenerateJobDescriptionProps {
  jobTitle: string;
  location: string;
  additionalInformation: string;
}

export async function GenerateJobDescription({
  jobTitle,
  location,
  additionalInformation,
}: GenerateJobDescriptionProps): Promise<string> {
  try {
    if (process.env.NODE_ENV === "production") {
      const ip = headers().get("x-forwarded-for");
      const { success } = await ratelimit.limit(ip as string);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "You can only generate two job descriptions every 60 seconds.",
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
    });

    return result;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred when trying to generate the job description.",
      cause: e,
    });
  }
}
