import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getCountriesForJob,
  getDevicesForJob,
  getReferrersForJob,
  getTotalViewsForJob,
  getTotalViewsForOrg,
  getViewsByDayForJob,
  getViewsByDayForOrg,
} from "../../lib/tb";
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
  getTotalViewsForJob: protectedProcedure
    .input(z.object({ teamId: z.string(), jobId: z.string() }))
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

      const data = await getTotalViewsForJob({
        org_id: team.id,
        job_id: input.jobId,
      });

      return data;
    }),
  getViewsByDayForJob: protectedProcedure
    .input(z.object({ teamId: z.string(), jobId: z.string() }))
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

      const data = await getViewsByDayForJob({
        org_id: team.id,
        job_id: input.jobId,
      });

      return data;
    }),
  getReferrersForJob: protectedProcedure
    .input(z.object({ teamId: z.string(), jobId: z.string() }))
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

      const data = await getReferrersForJob({
        org_id: team.id,
        job_id: input.jobId,
      });

      return data;
    }),
  getCountriesForJob: protectedProcedure
    .input(z.object({ teamId: z.string(), jobId: z.string() }))
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

      const data = await getCountriesForJob({
        org_id: team.id,
        job_id: input.jobId,
      });

      return data;
    }),
  getDevicesForJob: protectedProcedure
    .input(z.object({ teamId: z.string(), jobId: z.string() }))
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

      const data = await getDevicesForJob({
        org_id: team.id,
        job_id: input.jobId,
      });

      return data;
    }),
});
