/*
  Warnings:

  - You are about to drop the column `min_duration_min` on the `places` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "places" DROP COLUMN "min_duration_min",
ADD COLUMN     "min_duration_minutes" INTEGER NOT NULL DEFAULT 30;
