import { Body, Controller, Post } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ValidationPipe } from 'src/common/validation.pipe';
import CreateAuctionDTO from './createAuctionDTO';

@Controller('/auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async createAuction(
    @Body(new ValidationPipe()) createAuctionDTO: CreateAuctionDTO,
  ) {
    return await this.auctionService.create(createAuctionDTO);
  }
}
