/*
  Warnings:

  - You are about to drop the column `dailyActivitiesId` on the `ConsumedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `dailyActivitiesId` on the `PerformedExercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConsumedProduct" DROP CONSTRAINT "ConsumedProduct_dailyActivitiesId_fkey";

-- DropForeignKey
ALTER TABLE "PerformedExercise" DROP CONSTRAINT "PerformedExercise_dailyActivitiesId_fkey";

-- DropIndex
DROP INDEX "ConsumedProduct_product_id_key";

-- DropIndex
DROP INDEX "PerformedExercise_exercise_id_key";

-- AlterTable
ALTER TABLE "ConsumedProduct" DROP COLUMN "dailyActivitiesId",
ADD COLUMN     "daily_activities_id" TEXT;

-- AlterTable
ALTER TABLE "PerformedExercise" DROP COLUMN "dailyActivitiesId",
ADD COLUMN     "daily_activities_id" TEXT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "avatarPath" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "ConsumedProduct" ADD CONSTRAINT "ConsumedProduct_daily_activities_id_fkey" FOREIGN KEY ("daily_activities_id") REFERENCES "DailyActivities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_daily_activities_id_fkey" FOREIGN KEY ("daily_activities_id") REFERENCES "DailyActivities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
