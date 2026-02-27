/*
  Warnings:

  - You are about to drop the column `stat` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the `AuctionDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `state` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Auction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuctionCategory" AS ENUM ('Car', 'Motorcycle', 'Apartment', 'House', 'Land', 'CommercialProperty', 'Default');

-- DropForeignKey
ALTER TABLE "AuctionDetail" DROP CONSTRAINT "AuctionDetail_auctionId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "stat",
ADD COLUMN     "state" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "AuctionCategory" NOT NULL;

-- DropTable
DROP TABLE "AuctionDetail";

-- CreateTable
CREATE TABLE "VehicleDetail" (
    "id" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "yearManufacture" TEXT,
    "yearModel" TEXT,
    "uf" TEXT,
    "plate" TEXT,
    "chassis" TEXT,
    "renavam" TEXT,
    "engineNumber" TEXT,
    "mileage" TEXT,
    "fuel" TEXT,
    "color" TEXT,
    "transmission" TEXT,
    "doors" INTEGER,
    "armored" BOOLEAN,
    "engine" TEXT,
    "gearbox" TEXT,
    "steering" TEXT,
    "paint" TEXT,
    "bodywork" TEXT,
    "upholstery" TEXT,
    "tires" TEXT,
    "electrical" TEXT,
    "mechanics" TEXT,
    "conservationState" TEXT,
    "working" BOOLEAN,
    "accessories" JSONB,
    "description" TEXT,
    "inspectionAddress" TEXT,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "VehicleDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyDetail" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "area" TEXT,
    "privatArea" TEXT,
    "landArea" TEXT,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "parkingSpots" INTEGER,
    "floor" TEXT,
    "registry" TEXT,
    "registration" TEXT,
    "conservationState" TEXT,
    "occupied" BOOLEAN,
    "description" TEXT,
    "amenities" TEXT[],
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "PropertyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDetail_auctionId_key" ON "VehicleDetail"("auctionId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyDetail_auctionId_key" ON "PropertyDetail"("auctionId");

-- AddForeignKey
ALTER TABLE "VehicleDetail" ADD CONSTRAINT "VehicleDetail_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyDetail" ADD CONSTRAINT "PropertyDetail_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
