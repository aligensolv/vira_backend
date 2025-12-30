/*
  Warnings:

  - You are about to drop the column `username` on the `Manager` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Manager_username_key";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");
