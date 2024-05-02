import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const publicRouter = createTRPCRouter({
  getOrganisation: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const org = await ctx.db.team.findUnique({
        where: { slug: input.id },
        include: {
          jobs: {
            select: { title: true, location: true, slug: true, id: true },
            where: { status: { equals: "Open" } },
          },
          _count: { select: { jobs: true } },
        },
      });

      return org;
    }),
  getJob: publicProcedure
    .input(z.object({ orgId: z.string(), jobId: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await ctx.db.job.findUnique({
        where: {
          slug: input.jobId,
          team: { slug: input.orgId },
          status: { equals: "Open" },
        },
        include: {
          team: { select: { avatar: true, name: true } },
        },
      });

      return job;
    }),
});
