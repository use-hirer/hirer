-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Draft', 'Open', 'Closed');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'Draft';
