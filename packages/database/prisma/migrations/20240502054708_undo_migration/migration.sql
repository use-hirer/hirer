/*
  Warnings:

  - You are about to drop the column `slug` on the `JobStage` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `JobStage` table. All the data in the column will be lost.
  - Added the required column `name` to the `JobStage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "JobStage_jobId_slug_key";

-- AlterTable
ALTER TABLE "JobStage" DROP COLUMN "slug",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;
