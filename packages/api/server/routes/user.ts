import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  onboard: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        role: z.string(),
        source: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.onboarded) {
        return false;
      }

      await ctx.db.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          onboarded: true,
          name: ctx.user.name.length > 0 ? ctx.user.name : input.name,
          data: {
            onboardingInfo: {
              role: input.role,
              source: input.source,
            },
          },
        },
      });
    }),
});
