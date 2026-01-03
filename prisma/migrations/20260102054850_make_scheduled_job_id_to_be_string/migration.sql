/*
  Warnings:

  - The primary key for the `scheduled_jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `scheduled_jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "scheduled_jobs" DROP CONSTRAINT "scheduled_jobs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "scheduled_jobs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "scheduled_jobs_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "scheduled_jobs_id_key" ON "scheduled_jobs"("id");
