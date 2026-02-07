import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import CreateAuctioneerDTO from "./dto/createAuctioneerDTO";
import AuctioneerService from "./auctioneer.service";
import UpdateAuctioneerDTO from "./dto/updateAuctioneerDTO";

@Controller('/auctioneer')
export class AuctioneerController{
  
  constructor(private readonly auctioneerSerive: AuctioneerService){}

  @Post()
  async createAuctioneer(@Body() createAuctioneerDTO: CreateAuctioneerDTO){
    return await this.auctioneerSerive.create(createAuctioneerDTO);
  }
    
  @Get(':id')
  async getAuctioneer(@Param("id",ParseIntPipe) id:number){
    return await this.auctioneerSerive.get(id)
  }

  @Put(':id') 
  async update(@Param('id',ParseIntPipe) id: number, @Body() dto: UpdateAuctioneerDTO) {
    return await this.auctioneerSerive.update(id,dto)
  }

 @Delete(':id')
  async deleteAuctioneer(@Param("id",ParseIntPipe) id:number){
    return await this.auctioneerSerive.delete(id)
  }
}