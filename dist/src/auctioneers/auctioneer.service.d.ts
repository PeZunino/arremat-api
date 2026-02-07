import { PrismaService } from "src/prisma.service";
import { Prisma } from "src/generated/prisma/client";
export default class AuctioneerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AuctioneerCreateInput): Promise<void>;
}
