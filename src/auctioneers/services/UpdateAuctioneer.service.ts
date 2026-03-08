import { Inject, Injectable } from '@nestjs/common';
import { Auctioneer } from '../Auctioneer';

import {
  AUCTIONEER_REPOSITORY,
  IAuctioneerRepository,
} from '../repositories/auctioneer.repository.interface';

@Injectable()
export default class UpdateAuctioneerService {
  constructor(
    @Inject(AUCTIONEER_REPOSITORY)
    private readonly auctioneerRepository: IAuctioneerRepository,
  ) {}

  async execute(data: Partial<Auctioneer>) {
    const updatedAuctioneer = await this.auctioneerRepository.update(data);

    return updatedAuctioneer;
  }
}
