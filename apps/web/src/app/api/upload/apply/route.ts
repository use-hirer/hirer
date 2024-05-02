import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { trackEvent } from "@hirer/api/lib/tb";
import prisma from "@hirer/database";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type ApplicationPayload = {
  jobId: string;
  orgId: string;
  application: {
    filename: string;
    name: string;
    email: string;
    additionalInformation: string;
  };
};

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(request: NextRequest) {
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(1, "60 s"),
  });

  if (process.env.NODE_ENV === "production") {
    const ip = headers().get("x-forwarded-for");
    const { success } = await ratelimit.limit(ip as string);

    if (!success) {
      return new Response(null, {
        status: 429,
        statusText:
          "Too Many Requests. You can only upload 1 resume every 60 seconds.",
      });
    }
  }

  const data = await request.formData();
  const body = Object.fromEntries(data);

  const payload: ApplicationPayload = JSON.parse(body.data as string);

  const job = await prisma.job.findUnique({
    where: {
      id: payload.jobId,
      // status: { equals: "Open" },
      team: { slug: payload.orgId },
    },
  });

  if (!job) {
    return new Response(null, {
      status: 404,
      statusText: "Job not found.",
    });
  }

  const candidate = await prisma.candidate.findFirst({
    where: { email: payload.application.email },
  });

  if (!candidate) {
    const candidate = await prisma.candidate.create({
      data: {
        name: payload.application.name,
        email: payload.application.email,
        teamId: job.teamId,
        notes: payload.application.additionalInformation,
      },
    });

    const resume = await prisma.candidateResume.create({
      data: {
        id: nanoid(16),
        candidateId: candidate?.id as string,
        bucketId: `resumes/${candidate?.id}/${nanoid(16)}.pdf`,
        notes: "",
      },
    });

    await trackEvent({
      date: new Date(),
      event: "create_candidate",
      org_id: job.teamId,
      user_id: "SYSTEM",
      event_data: JSON.stringify({
        candidate_id: candidate.id,
        candidate_name: payload.application.name,
        candidate_email: payload.application.email,
      }),
    });

    const stage = await prisma.jobStage.findFirst({
      where: { jobId: job.id, order: 1 },
    });

    const application = await prisma.candidateApplication.create({
      data: {
        stageId: stage?.id as string,
        candidateId: candidate.id,
        jobId: job.id,
        resumeId: resume.id,
        notes: "",
      },
    });

    const putObjectCommand = new PutObjectCommand({
      Bucket: "hirer",
      Key: resume.bucketId,
      Body: (await (body.file as File).arrayBuffer()) as Buffer,
      ContentType: "application/pdf",
    });

    await s3.send(putObjectCommand);

    await trackEvent({
      date: new Date(),
      event: "create_job_application",
      org_id: job.teamId,
      user_id: "SYSTEM",
      event_data: JSON.stringify({
        applicant_name: payload.application.name,
        applicant_email: payload.application.email,
        application_id: application.id,
        application_candidate_id: candidate.id,
        application_job_id: job.id,
      }),
    });
  }

  const application = await prisma.candidateApplication.findFirst({
    where: { candidateId: candidate?.id, jobId: job.id },
  });

  if (!application) {
    const resume = await prisma.candidateResume.create({
      data: {
        id: nanoid(16),
        candidateId: candidate?.id as string,
        bucketId: `resumes/${candidate?.id}/${nanoid(16)}.pdf`,
        notes: "",
      },
    });

    const stage = await prisma.jobStage.findFirst({
      where: { jobId: job.id, order: 1 },
    });

    const application = await prisma.candidateApplication.create({
      data: {
        candidateId: candidate?.id as string,
        jobId: job.id,
        resumeId: resume.id,
        notes: "",
        stageId: stage?.id as string,
      },
    });

    const putObjectCommand = new PutObjectCommand({
      Bucket: "hirer",
      Key: resume.bucketId,
      Body: (await (body.file as File).arrayBuffer()) as Buffer,
      ContentType: "application/pdf",
    });

    await s3.send(putObjectCommand);

    await trackEvent({
      date: new Date(),
      event: "create_job_application",
      org_id: job.teamId,
      user_id: "SYSTEM",
      event_data: JSON.stringify({
        applicant_name: payload.application.name,
        applicant_email: payload.application.email,
        application_id: application.id,
        application_candidate_id: candidate?.id,
        application_job_id: job.id,
      }),
    });
  }

  return NextResponse.json(body);
}
