/*
  Warnings:

  - The `currentWeight` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `desiredWeight` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "currentWeight",
ADD COLUMN     "currentWeight" INTEGER,
DROP COLUMN "desiredWeight",
ADD COLUMN     "desiredWeight" INTEGER;
