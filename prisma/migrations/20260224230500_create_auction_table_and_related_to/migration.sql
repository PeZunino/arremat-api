-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('Car', 'Motorcycle', 'Default');

-- CreateTable
CREATE TABLE "AuctionRound" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "AuctionRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Legal" (
    "id" TEXT NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "plaintiff" TEXT NOT NULL,
    "defendant" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "Legal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionDetail" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT[],
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "AuctionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auction" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "auctioneer" TEXT NOT NULL,
    "initialValue" DOUBLE PRECISION NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL,
    "closeDate" TIMESTAMP(3) NOT NULL,
    "lastBid" DOUBLE PRECISION NOT NULL,
    "category" "Vehicle" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Legal_auctionId_key" ON "Legal"("auctionId");

-- AddForeignKey
ALTER TABLE "AuctionRound" ADD CONSTRAINT "AuctionRound_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legal" ADD CONSTRAINT "Legal_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionDetail" ADD CONSTRAINT "AuctionDetail_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
