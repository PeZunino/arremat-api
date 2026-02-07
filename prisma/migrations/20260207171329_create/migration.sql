-- CreateTable
CREATE TABLE "Auctioneer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT[],

    CONSTRAINT "Auctioneer_pkey" PRIMARY KEY ("id")
);
