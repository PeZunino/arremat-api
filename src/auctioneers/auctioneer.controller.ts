import { Body, Controller, Get, Post } from "@nestjs/common";
import CreateAuctioneerDTO from "./dto/createAuctioneerDTO";
import AuctioneerService from "./auctioneer.service";

@Controller('/auctioneer')
export class AuctioneerController{
  
  constructor(private readonly auctioneerSerive: AuctioneerService){}
  
  @Post()
  createAuctioneer(@Body() createAuctioneerDTO: CreateAuctioneerDTO){
    return this.auctioneerSerive.create(createAuctioneerDTO);
  }
}