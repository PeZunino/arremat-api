import { Injectable } from '@nestjs/common';
import { Auctioneer } from '../Auctioneer';

import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';

@Injectable()
export default class UpdateAuctioneerService {
  constructor(private readonly auctioneerRepository: IAuctioneerRepository) {}

  async execute(data: Partial<Auctioneer>) {
    const updatedAuctioneer = await this.auctioneerRepository.update(data);

    return updatedAuctioneer;
  }
}
