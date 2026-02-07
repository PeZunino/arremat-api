import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import CreateAuctioneerDTO from "./dto/createAuctioneerDTO";
import { Prisma } from "src/generated/prisma/client";

@Injectable()
export default class AuctioneerService{

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AuctioneerCreateInput){
    await this.prisma.auctioneer.create({data})
  }
}