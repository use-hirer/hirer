import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const settingsRouter = createTRPCRouter({
  getGeneral: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      const org = await ctx.db.team.findUnique({
        where: { slug: input.orgId },
      });

      return org;
    }),
  updateOrganisationName: protectedProcedure
    .input(z.object({ orgId: z.string(), name: z.string() }))

    .mutation(async ({ ctx, input }) => {
      const org = await ctx.db.team.findUnique({
        where: { slug: input.orgId },
      });

      if (!org) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The org could not be found.`,
        });
      }

      await ctx.db.team.update({
        where: { id: org.id },
        data: { name: input.name },
      });

      return org.name;
    }),
});
