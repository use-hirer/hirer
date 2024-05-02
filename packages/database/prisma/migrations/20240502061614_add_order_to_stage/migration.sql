/*
  Warnings:

  - Added the required column `order` to the `JobStage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobStage" ADD COLUMN     "order" INTEGER NOT NULL;
