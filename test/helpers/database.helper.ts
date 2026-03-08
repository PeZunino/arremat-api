import { PrismaService } from 'src/prisma/prisma.service';

export async function cleanDatabase(prisma: PrismaService) {
  await prisma.$transaction([
    prisma.auctionRound.deleteMany(),
    prisma.vehicleDetail.deleteMany(),
    prisma.propertyDetail.deleteMany(),
    prisma.auction.deleteMany(),
    prisma.auctioneer.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
