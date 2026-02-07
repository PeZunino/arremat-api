import CreateAuctioneerDTO from "./dto/createAuctioneerDTO";
import AuctioneerService from "./auctioneer.service";
export declare class AuctioneerController {
    private readonly auctioneerSerive;
    constructor(auctioneerSerive: AuctioneerService);
    createAuctioneer(createAuctioneerDTO: CreateAuctioneerDTO): Promise<void>;
}
