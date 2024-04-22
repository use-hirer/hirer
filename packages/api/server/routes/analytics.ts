import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getTotalViewsForOrg, getViewsByDayForOrg } from "../../lib/tb";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const analyticsRouter = createTRPCRouter({
  getViewsByDayForOrg: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const whereClause = input.teamId.startsWith("tm_")
        ? { id: input.teamId }
        : { slug: input.teamId };

      const team = await ctx.db.team.findUnique({
        where: whereClause,
        select: {
          id: true,
          members: {
            where: {
              userId: ctx.session.userId,
            },
          },
        },
      });

      if (!team || !team.members) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The org could not be found.`,
        });
      }

      const data = await getViewsByDayForOrg({
        org_id: team.id,
      });

      return data;
    }),
  getTotalViewsForOrg: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const whereClause = input.teamId.startsWith("tm_")
        ? { id: input.teamId }
        : { slug: input.teamId };

      const team = await ctx.db.team.findUnique({
        where: whereClause,
        select: {
          id: true,
          members: {
            where: {
              userId: ctx.session.userId,
            },
          },
        },
      });

      if (!team || !team.members) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The org could not be found.`,
        });
      }

      const data = await getTotalViewsForOrg({
        org_id: team.id,
      });

      return data;
    }),
});
