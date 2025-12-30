-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_region_id_fkey";

-- AlterTable
ALTER TABLE "places" ALTER COLUMN "region_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
