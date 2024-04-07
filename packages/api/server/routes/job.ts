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
  getMany: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        title: z.string().optional(),
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

      const jobs = await ctx.db.job.findMany({
        where: {
          teamId: team.id,
          title: { contains: input.title, mode: "insensitive" },
        },
        include: {
          creator: { select: { name: true, id: true } },
          _count: { select: { applications: true } },
        },
      });

      return jobs;
    }),
  create: protectedProcedure
    .input(
      z
        .object({
          details: z.object({
            title: z.string(),
            location: z.string(),
            description: z.string(),
          }),
          teamId: z.string().optional(),
          teamName: z.string().optional(),
        })
        .refine(
          (data) =>
            (data.teamId && !data.teamName) || (!data.teamId && data.teamName),
          {
            message: "Either teamId or teamName must be provided, but not both",
          }
        )
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: {
          id: input.teamId,
          slug: input.teamName,
        },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The team with id ${input.teamId} could not be found.`,
        });
      }

      // TODO: Fix Slug Generation
      const job = await ctx.db.job.create({
        data: {
          teamId: team.id,
          slug: "123-frontend-engineer",
          creatorUserId: ctx.session.userId,
          title: input.details.title,
          location: input.details.location,
          description: input.details.description,
        },
      });

      return job;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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

      await ctx.db.job.delete({ where: { id: input.id } });
    }),
});
