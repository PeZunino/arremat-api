import { Module } from '@nestjs/common';
import { AuctioneerController } from './auctioneer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateAuctioneerService from './services/CreateAuctioneer.service';
import UpdateAuctioneerService from './services/UpdateAuctioneer.service';
import DeleteAuctioneerService from './services/DeleteAuctioneer.service';
import ListAuctioneerService from './services/ListAuctioneer.service';
import { IAuctioneerRepository } from './repositories/auctioneer.repository.interface';
import { AuctioneerPrismaRepository } from './repositories/auctioneer.prisma.repository';

@Module({
  controllers: [AuctioneerController],
  providers: [
    CreateAuctioneerService,
    UpdateAuctioneerService,
    DeleteAuctioneerService,
    ListAuctioneerService,
    PrismaService,
    {
      provide: IAuctioneerRepository,
      useClass: AuctioneerPrismaRepository,
    },
  ],
})
export default class AuctioneerModule {}
