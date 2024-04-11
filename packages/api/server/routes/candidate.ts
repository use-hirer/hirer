import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const candidateRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        name: z.string().optional(),
      })
    )
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

      const candidates = await ctx.db.candidate.findMany({
        where: {
          teamId: team.id,
          name: { contains: input.name, mode: "insensitive" },
        },
        include: {
          _count: { select: { applications: true } },
          applications: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              createdAt: true,
              notes: true,
            },
          },
        },
      });

      return candidates;
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string(), teamId: z.string() }))
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

      const candidate = await ctx.db.candidate.findUnique({
        where: { id: input.id, teamId: team.id },
        include: { _count: { select: { applications: true } } },
      });

      return candidate;
    }),
  create: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        name: z.string(),
        email: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      const candidate = await ctx.db.candidate.create({
        data: {
          name: input.name,
          notes: input.notes,
          email: input.email,
          teamId: team.id,
        },
      });

      return candidate;
    }),
});
