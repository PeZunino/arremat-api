import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import  AuctioneerModule  from './auctioneers/auctioneer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      skipProcessEnv:true,
    }),
    AuctioneerModule
  ],
})
export class AppModule {}
