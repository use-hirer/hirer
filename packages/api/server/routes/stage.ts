import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const stageRouter = createTRPCRouter({
  moveCandidate: protectedProcedure
    .input(z.object({ stageId: z.string(), applicationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const stage = await ctx.db.jobStage.findUnique({
        where: {
          id: input.stageId,
        },
      });

      if (!stage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The stage with id ${input.stageId} could not be found.`,
        });
      }

      const candidate = await ctx.db.candidateApplication.findUnique({
        where: {
          id: input.applicationId,
        },
      });

      if (!candidate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The candidate with id ${input.applicationId} could not be found.`,
        });
      }

      await ctx.db.candidateApplication.update({
        where: { id: input.applicationId },
        data: { stageId: input.stageId },
      });
    }),
});
