import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ValidationPipe } from 'src/common/validation.pipe';
import { CreateAuctionDTO } from './createAuctionDTO';
import { AllowAnon } from 'src/auth/decorators/allow-anon.decorator';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@Controller('/auction')
@UseGuards(ApiKeyGuard)
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async createAuction(
    @Body(new ValidationPipe()) createAuctionDTO: CreateAuctionDTO,
  ) {
    return await this.auctionService.create(createAuctionDTO);
  }

  @AllowAnon()
  @Get()
  findAll() {
    return [];
  }
}
