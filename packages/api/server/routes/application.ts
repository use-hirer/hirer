import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { z } from "zod";
import { trackEvent } from "../../lib/tb";
import { createTRPCRouter, publicProcedure } from "../trpc";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "60 s"),
});

export const applicationRouter = createTRPCRouter({
  apply: publicProcedure
    .input(
      z.object({
        orgId: z.string(),
        jobId: z.string(),
        name: z.string(),
        email: z.string(),
        additionalInformation: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.headers.get("x-forwarded-for");
      const { success } = await ratelimit.limit(ip as string);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You can only apply for a job every 60 seconds.",
        });
      }

      const job = await ctx.db.job.findUnique({
        where: {
          slug: input.jobId,
          status: { equals: "Open" },
          team: { slug: input.orgId },
        },
      });

      if (!job) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `The job could not be found.`,
        });
      }

      const candidate = await ctx.db.candidate.findFirst({
        where: { email: input.email, teamId: job.teamId },
      });

      if (!candidate) {
        const candidate = await ctx.db.candidate.create({
          data: {
            name: input.name,
            email: input.email,
            teamId: job.teamId,
            notes: input.additionalInformation,
          },
        });

        await trackEvent({
          date: new Date(),
          event: "create_candidate",
          org_id: job.teamId,
          user_id: "SYSTEM",
          event_data: JSON.stringify({
            candidate_id: candidate.id,
            candidate_name: input.name,
            candidate_email: input.email,
          }),
        });

        const application = await ctx.db.candidateApplication.create({
          data: {
            candidateId: candidate.id,
            jobId: job.id,
            notes: "",
          },
        });

        await trackEvent({
          date: new Date(),
          event: "create_job_application",
          org_id: job.teamId,
          user_id: "SYSTEM",
          event_data: JSON.stringify({
            applicant_name: input.name,
            applicant_email: input.email,
            application_id: application.id,
            application_candidate_id: candidate.id,
            application_job_id: job.id,
          }),
        });
      }

      const application = await ctx.db.candidateApplication.findFirst({
        where: { candidateId: candidate?.id, jobId: job.id },
      });

      if (!application) {
        const application = await ctx.db.candidateApplication.create({
          data: {
            candidateId: candidate?.id as string,
            jobId: job.id,
            notes: "",
          },
        });

        await trackEvent({
          date: new Date(),
          event: "create_job_application",
          org_id: job.teamId,
          user_id: "SYSTEM",
          event_data: JSON.stringify({
            applicant_name: input.name,
            applicant_email: input.email,
            application_id: application.id,
            application_candidate_id: candidate?.id,
            application_job_id: job.id,
          }),
        });
      }

      return candidate;
    }),
});
