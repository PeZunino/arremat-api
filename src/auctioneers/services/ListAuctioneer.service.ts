import { Inject, Injectable } from '@nestjs/common';
import {
  AUCTIONEER_REPOSITORY,
  IAuctioneerRepository,
} from '../repositories/auctioneer.repository.interface';

@Injectable()
export default class ListAuctioneerService {
  constructor(
    @Inject(AUCTIONEER_REPOSITORY)
    private readonly auctioneerRepository: IAuctioneerRepository,
  ) {}

  async execute(id?: string) {
    if (id) {
      return await this.auctioneerRepository.findById(id);
    } else {
      return await this.auctioneerRepository.get();
    }
  }
}
