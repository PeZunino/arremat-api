import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ValidationPipe } from 'src/common/validation.pipe';
import CreateAuctioneerDTO from './dto/createAuctioneerDTO';
import UpdateAuctioneerDTO from './dto/updateAuctioneerDTO';
import ListAuctioneerService from './services/ListAuctioneer.service';
import CreateAuctioneerService from './services/CreateAuctioneer.service';
import UpdateAuctioneerService from './services/UpdateAuctioneer.service';
import DeleteAuctioneerService from './services/DeleteAuctioneer.service';

@Controller('/auctioneer')
export class AuctioneerController {
  constructor(
    private readonly createAuctioneerService: CreateAuctioneerService,
    private readonly listAuctioneerService: ListAuctioneerService,
    private readonly updateAuctioneerService: UpdateAuctioneerService,
    private readonly deleteAuctioneerService: DeleteAuctioneerService,
  ) {}

  @Post()
  async createAuctioneer(
    @Body(new ValidationPipe()) createAuctioneerDTO: CreateAuctioneerDTO,
  ) {
    return await this.createAuctioneerService.execute(createAuctioneerDTO);
  }

  @Get(':id')
  async getAuctioneer(@Param('id', ParseUUIDPipe) id: string) {
    return await this.listAuctioneerService.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAuctioneerDTO,
  ) {
    return await this.updateAuctioneerService.execute({
      id,
      auctioneer: dto,
    });
  }

  @Delete(':id')
  async deleteAuctioneer(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deleteAuctioneerService.execute(id);
  }
}
