import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const job = await ctx.db.job.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!job) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The job with id ${input.id} could not be found.`,
        });
      }

      return job;
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        location: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {}),
});
