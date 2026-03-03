import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAuctionDTO } from './createAuctionDTO';

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async create(newAuction: CreateAuctionDTO) {
    const data = this.mapToPrisma(newAuction);
    try {
      const result = await this.prisma.auction.create({ data });
      console.log('[AuctionService] created id:', result.id);
      return result;
    } catch (err) {
      console.error('[AuctionService] Prisma error:', err);
      throw err;
    }
  }
  private mapToPrisma(dto: CreateAuctionDTO): Prisma.AuctionCreateInput {
    return {
      url: dto.url,
      title: dto.title,
      city: dto.city,
      state: dto.state,
      seller: dto.seller,
      auctioneer: dto.auctioneer,
      initialValue: dto.initialValue,
      openDate: new Date(dto.openDate), // Garanta que é um objeto Date
      closeDate: new Date(dto.closeDate),
      lastBid: dto.lastBid,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      category: dto.category as any, // Força o cast para o Enum Vehicle do Prisma
      rounds: {
        create: dto.rounds.map((round) => ({
          date: new Date(round.date),
          value: round.value,
        })),
      },
      caseNumber: dto.legal?.caseNumber || 'N/A',
      defendant: dto.legal?.defendant || 'N/A',
      plaintiff: dto.legal?.plaintiff || 'N/A',
      // Limpeza de undefined para o VehicleDetail
      vehicleDetail: dto.vehicleDetail
        ? {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            create: Object.fromEntries(
              Object.entries(dto.vehicleDetail).filter(
                ([_, v]) => v !== undefined,
              ),
            ) as any,
          }
        : undefined,
    };
  }
}
