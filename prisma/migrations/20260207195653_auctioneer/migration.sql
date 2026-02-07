/*
  Warnings:

  - The primary key for the `Auctioneer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Auctioneer" DROP CONSTRAINT "Auctioneer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Auctioneer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Auctioneer_id_seq";
