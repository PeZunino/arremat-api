import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IAuctioneerRepository } from './auctioneer.repository.interface';
import { AuctioneerMapper } from './auctioneer.prisma.mapper';
import { Auctioneer } from '../Auctioneer';

@Injectable()
export class AuctioneerPrismaRepository implements IAuctioneerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Auctioneer | null> {
    const foundAuctioneer = await this.prisma.auctioneer.findUnique({
      where: { id },
    });

    if (!foundAuctioneer) return null;

    return AuctioneerMapper.toDomain(foundAuctioneer);
  }

  async create(auctioneer: Auctioneer): Promise<Auctioneer> {
    const prismaAuctioneer = AuctioneerMapper.toPrisma(auctioneer);

    const newAuctioneer = await this.prisma.auctioneer.create({
      data: prismaAuctioneer,
    });

    return AuctioneerMapper.toDomain(newAuctioneer);
  }

  async update(auctioneer: Auctioneer): Promise<Auctioneer> {
    const data = AuctioneerMapper.toPrisma(auctioneer);
    const updated = await this.prisma.auctioneer.update({
      where: { id: auctioneer.id },
      data,
    });
    return AuctioneerMapper.toDomain(updated);
  }

  async get(): Promise<Auctioneer[]> {
    const auctioneers = await this.prisma.auctioneer.findMany();

    return auctioneers.map((auctioneer) =>
      AuctioneerMapper.toDomain(auctioneer),
    );
  }
  async delete(id: string): Promise<void> {
    await this.prisma.auctioneer.delete({ where: { id } });
  }
}
