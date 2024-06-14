-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "assessmentCriteria" TEXT,
ADD COLUMN     "includeDescriptionInAssessment" BOOLEAN NOT NULL DEFAULT true;
