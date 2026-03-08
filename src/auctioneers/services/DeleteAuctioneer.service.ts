import { Injectable } from '@nestjs/common';

import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';

@Injectable()
export default class DeleteAuctioneerService {
  constructor(private readonly auctioneerRepository: IAuctioneerRepository) {}

  async execute(id: string) {
    const updatedAuctioneer = await this.auctioneerRepository.delete(id);

    return updatedAuctioneer;
  }
}
