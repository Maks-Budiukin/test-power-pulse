/*
  Warnings:

  - The required column `id` was added to the `Profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "height" SET DEFAULT '',
ALTER COLUMN "currentWeight" DROP NOT NULL,
ALTER COLUMN "currentWeight" SET DEFAULT '',
ALTER COLUMN "desiredWeight" DROP NOT NULL,
ALTER COLUMN "desiredWeight" SET DEFAULT '',
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "avatarPath" DROP NOT NULL,
ALTER COLUMN "blood" DROP NOT NULL,
ALTER COLUMN "sex" DROP NOT NULL,
ALTER COLUMN "levelActivity" DROP NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Calculate" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_id" TEXT NOT NULL,
    "dailyCalories" INTEGER NOT NULL,
    "exerciseTime" INTEGER NOT NULL,

    CONSTRAINT "Calculate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calculate_profile_id_key" ON "Calculate"("profile_id");

-- AddForeignKey
ALTER TABLE "Calculate" ADD CONSTRAINT "Calculate_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
