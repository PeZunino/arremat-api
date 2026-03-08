import { Inject, Injectable } from '@nestjs/common';

import {
  AUCTIONEER_REPOSITORY,
  IAuctioneerRepository,
} from '../repositories/auctioneer.repository.interface';

@Injectable()
export default class DeleteAuctioneerService {
  constructor(
    @Inject(AUCTIONEER_REPOSITORY)
    private readonly auctioneerRepository: IAuctioneerRepository,
  ) {}

  async execute(id: string) {
    const updatedAuctioneer = await this.auctioneerRepository.delete(id);

    return updatedAuctioneer;
  }
}
