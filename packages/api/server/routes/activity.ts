import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getEventsByOrgId } from "../../lib/tb";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const activityRouter = createTRPCRouter({
  getActivityByOrgId: protectedProcedure
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
          message: `The team could not be found.`,
        });
      }

      const data = await getEventsByOrgId({
        org_id: team.id,
        page: 0,
        page_size: 500,
      });

      return data;
    }),
});
