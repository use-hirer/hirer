/*
  Warnings:

  - Added the required column `stageId` to the `CandidateApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateApplication" ADD COLUMN     "stageId" TEXT NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "JobStage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobStage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CandidateApplication" ADD CONSTRAINT "CandidateApplication_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "JobStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStage" ADD CONSTRAINT "JobStage_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
