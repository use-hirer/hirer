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
  updateOrganisationSlug: protectedProcedure
    .input(z.object({ orgId: z.string(), slug: z.string() }))
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
        data: { slug: input.slug },
      });

      return org.slug;
    }),
  updateOrganisationDescription: protectedProcedure
    .input(z.object({ orgId: z.string(), description: z.string().optional() }))
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
        data: { bio: input.description },
      });

      return org.bio;
    }),
});
