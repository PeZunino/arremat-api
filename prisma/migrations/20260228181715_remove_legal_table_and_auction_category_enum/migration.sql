/*
  Warnings:

  - You are about to drop the `Legal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caseNumber` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defendant` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plaintiff` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Auction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Legal" DROP CONSTRAINT "Legal_auctionId_fkey";

-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "caseNumber" TEXT NOT NULL,
ADD COLUMN     "defendant" TEXT NOT NULL,
ADD COLUMN     "plaintiff" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Vehicle" NOT NULL;

-- DropTable
DROP TABLE "Legal";

-- DropEnum
DROP TYPE "AuctionCategory";
