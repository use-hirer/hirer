/*
  Warnings:

  - You are about to drop the column `name` on the `JobStage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId,slug]` on the table `JobStage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `JobStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `JobStage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobStage" DROP COLUMN "name",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobStage_jobId_slug_key" ON "JobStage"("jobId", "slug");
