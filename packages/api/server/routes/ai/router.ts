import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { GenerateJobDescription } from "./helpers/job-description";
import { GenerateSocialMediaPost } from "./helpers/social-media-post";

export const aiRouter = createTRPCRouter({
  generateJobDescription: protectedProcedure
    .input(
      z.object({
        jobTitle: z.string(),
        location: z.string(),
        additionalInformation: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const description = await GenerateJobDescription({
        jobTitle: input.jobTitle,
        location: input.location,
        additionalInformation: input.additionalInformation,
      });

      return description;
    }),
  generateSocialMediaPost: protectedProcedure
    .input(
      z.object({
        jobName: z.string(),
        location: z.string(),
        additionalInformation: z.string(),
        length: z.number(),
        link: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await GenerateSocialMediaPost({
        additionalInformation: input.additionalInformation,
        location: input.location,
        length: input.length,
        jobTitle: input.jobName,
        link: input.link,
      });

      return post;
    }),
});
