/*
  Warnings:

  - You are about to drop the column `daily_activities_id` on the `PerformedExercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PerformedExercise" DROP CONSTRAINT "PerformedExercise_daily_activities_id_fkey";

-- AlterTable
ALTER TABLE "PerformedExercise" DROP COLUMN "daily_activities_id";
