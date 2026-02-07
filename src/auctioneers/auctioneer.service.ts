import { Injectable } from "@nestjs/common";
import { Prisma } from "src/generated/prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export default class AuctioneerService{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AuctioneerCreateInput){
    await this.prisma.auctioneer.create({data})
  }

  async get(id:number){
    return await this.prisma.auctioneer.findFirst({where:{id}})
  }

  async update(id:number,data:Prisma.AuctioneerUpdateInput){
    return await this.prisma.auctioneer.update({data,where:{id}})
  }

  async delete(id: number) {
    await this.prisma.auctioneer.delete({where:{id}})
  }
}