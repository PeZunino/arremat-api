import { Auctioneer } from '../Auctioneer';
import { Email } from '../vo/Email.vo';
import { Phone } from '../vo/Phone.vo';
import type {
  Prisma,
  Auctioneer as PrismaAuctioneer,
} from '../../generated/prisma/client';
import { Url } from 'src/auction/Url.vo';

export class AuctioneerMapper {
  static toDomain(raw: PrismaAuctioneer): Auctioneer {
    return Auctioneer.create({
      id: raw.id,
      name: raw.name,
      emails: raw.email.map((e) => Email.create(e)),
      phones: raw.phones.map((p) => Phone.create(p)),
      urls: raw.url.map((u) => Url.create(u)),
    });
  }

  static toPrisma(entity: Auctioneer): Prisma.AuctioneerCreateInput {
    return {
      name: entity.name,
      email: entity.emails.map((e) => e.value),
      phones: entity.phones.map((p) => p.value),
      url: entity.urls.map((u) => u.value),
      division: [],
    };
  }
}
