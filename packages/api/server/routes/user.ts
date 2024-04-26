import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  onboard: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        role: z.string(),
        source: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.onboarded) {
        return false;
      }

      await ctx.db.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          name:
            ctx.user.name !== "" || ctx.user.name !== null
              ? ctx.user.name
              : input.name,
          data: {
            userOnboarding: true,
            onboardingInfo: {
              role: input.role,
              source: input.source,
            },
          },
        },
      });
    }),
  getOrgs: protectedProcedure.query(async ({ ctx }) => {
    const orgs = await ctx.db.team.findMany({
      where: {
        members: {
          every: {
            userId: ctx.session.userId,
          },
        },
      },
      select: {
        slug: true,
        name: true,
        avatar: true,
      },
    });

    return orgs;
  }),
});
