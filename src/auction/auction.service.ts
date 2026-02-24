import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import CreateAuctionDTO from './createAuctionDTO';

export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async create(newAuction: CreateAuctionDTO) {
    const data = this.mapToPrisma(newAuction);
    return await this.prisma.auction.create({ data });
  }

  private mapToPrisma(dto: CreateAuctionDTO): Prisma.AuctionCreateInput {
    return {
      url: dto.url,
      title: dto.title,
      city: dto.city,
      stat: dto.stat,
      seller: dto.seller,
      auctioneer: dto.auctioneer,
      initialValue: dto.initialValue,
      openDate: dto.openDate,
      closeDate: dto.closeDate,
      lastBid: dto.lastBid,
      category: dto.category,

      rounds: {
        create: dto.rounds.map((round) => ({
          date: round.date,
          value: round.value,
        })),
      },

      legal: {
        create: {
          caseNumber: dto.legal.caseNumber,
          plaintiff: dto.legal.plaintiff,
          defendant: dto.legal.defendant,
        },
      },

      details: {
        create: {
          description: dto.details.description,
          status: dto.details.status,
        },
      },
    };
  }
}
