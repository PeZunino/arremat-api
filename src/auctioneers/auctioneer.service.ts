import { Injectable } from "@nestjs/common";
import { Prisma } from "src/generated/prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export default class AuctioneerService{

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AuctioneerCreateInput){
    await this.prisma.auctioneer.create({data})
  }
}