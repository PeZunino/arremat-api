import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import AuctioneerService from "./auctioneer.service";
import { ValidationPipe } from "src/common/validation.pipe";
import CreateAuctioneerDTO from "./dto/createAuctioneerDTO";
import UpdateAuctioneerDTO from "./dto/updateAuctioneerDTO";

@Controller('/auctioneer')
export class AuctioneerController{
  
  constructor(private readonly auctioneerSerive: AuctioneerService){}

  @Post()
  async createAuctioneer(@Body(new ValidationPipe()) createAuctioneerDTO: CreateAuctioneerDTO){
    return await this.auctioneerSerive.create({email:createAuctioneerDTO.email,name:createAuctioneerDTO.name,url:createAuctioneerDTO.url});
  }
    
  @Get(':id')
  async getAuctioneer(@Param("id",ParseUUIDPipe) id:string){
    return await this.auctioneerSerive.get(id)
  }

  @Put(':id') 
  async update(@Param('id',ParseUUIDPipe) id: string, @Body() dto: UpdateAuctioneerDTO) {
    return await this.auctioneerSerive.update(id,dto)
  }

 @Delete(':id')
  async deleteAuctioneer(@Param("id",ParseUUIDPipe) id:string){
    return await this.auctioneerSerive.delete(id)
  }
}