/*
  Warnings:

  - The values [CONFIRMED] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `duration_minutes` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `payments` table. All the data in the column will be lost.
  - Added the required column `actual_duration_minutes` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_hour` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requested_duration_minutes` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED', 'COMPLETED');
ALTER TABLE "public"."bookings" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "duration_minutes",
ADD COLUMN     "actual_duration_minutes" INTEGER NOT NULL,
ADD COLUMN     "price_per_hour" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "requested_duration_minutes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "payment_method",
ADD COLUMN     "method" TEXT,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "paid_at" DROP NOT NULL,
ALTER COLUMN "paid_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "booking_extensions" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "from_minutes" INTEGER NOT NULL,
    "to_minutes" INTEGER NOT NULL,
    "old_end_time" TIMESTAMP(3) NOT NULL,
    "new_end_time" TIMESTAMP(3) NOT NULL,
    "price_before" DECIMAL(10,2) NOT NULL,
    "price_after" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_extensions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "booking_extensions_booking_id_idx" ON "booking_extensions"("booking_id");

-- CreateIndex
CREATE INDEX "payments_user_id_idx" ON "payments"("user_id");

-- AddForeignKey
ALTER TABLE "booking_extensions" ADD CONSTRAINT "booking_extensions_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
