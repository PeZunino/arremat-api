/*
  Warnings:

  - You are about to drop the `Auction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuctionRound` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Auctioneer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuctionRound" DROP CONSTRAINT "AuctionRound_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyDetail" DROP CONSTRAINT "PropertyDetail_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleDetail" DROP CONSTRAINT "VehicleDetail_auctionId_fkey";

-- DropTable
DROP TABLE "Auction";

-- DropTable
DROP TABLE "AuctionRound";

-- DropTable
DROP TABLE "Auctioneer";

-- DropTable
DROP TABLE "PropertyDetail";

-- DropTable
DROP TABLE "VehicleDetail";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auctioneer" (
    "id" TEXT NOT NULL,
    "email" TEXT[],
    "name" TEXT NOT NULL,
    "phones" TEXT[],
    "url" TEXT[],
    "division" TEXT[],

    CONSTRAINT "auctioneer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction_round" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "auction_round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "auctioneer" TEXT NOT NULL,
    "initialValue" DOUBLE PRECISION NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL,
    "closeDate" TIMESTAMP(3) NOT NULL,
    "lastBid" DOUBLE PRECISION NOT NULL,
    "category" "Vehicle" NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "plaintiff" TEXT NOT NULL,
    "defendant" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_detail" (
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

    CONSTRAINT "vehicle_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_detail" (
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

    CONSTRAINT "property_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_detail_auctionId_key" ON "vehicle_detail"("auctionId");

-- CreateIndex
CREATE UNIQUE INDEX "property_detail_auctionId_key" ON "property_detail"("auctionId");

-- AddForeignKey
ALTER TABLE "auction_round" ADD CONSTRAINT "auction_round_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_detail" ADD CONSTRAINT "vehicle_detail_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_detail" ADD CONSTRAINT "property_detail_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
