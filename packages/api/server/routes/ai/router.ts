import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { GenerateJobDescription } from "./helpers/job-description";

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
});
