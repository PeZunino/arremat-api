/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { fakerPT_BR as faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

export function makeAuctioneerData(overrides = {}) {
  return {
    name: faker.company.name(),
    email: [faker.internet.email()],
    phones: [faker.phone.number()],
    url: [faker.internet.url()],
    division: [],
    ...overrides,
  };
}

export async function makeAuctioneer(prisma: PrismaService, overrides = {}) {
  return prisma.auctioneer.create({
    data: makeAuctioneerData(overrides),
  });
}
