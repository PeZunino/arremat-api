import { Module } from '@nestjs/common';
import AuctioneerService from './auctioneer.service';
import { AuctioneerController } from './auctioneer.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuctioneerController],
  providers: [AuctioneerService, PrismaService],
  exports: [AuctioneerService],
})
export default class AuctioneerModule {}
