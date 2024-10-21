/*
  Warnings:

  - You are about to drop the column `daily_activities_id` on the `ConsumedProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConsumedProduct" DROP CONSTRAINT "ConsumedProduct_daily_activities_id_fkey";

-- DropForeignKey
ALTER TABLE "ConsumedProduct" DROP CONSTRAINT "ConsumedProduct_product_id_fkey";

-- AlterTable
ALTER TABLE "ConsumedProduct" DROP COLUMN "daily_activities_id";
