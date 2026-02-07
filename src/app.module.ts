import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import  AuctioneerModule  from './auctioneers/auctioneer.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      skipProcessEnv:true,
    }),
    AuctioneerModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)  
      .forRoutes({path:'/*',method:RequestMethod.ALL});
  }
}