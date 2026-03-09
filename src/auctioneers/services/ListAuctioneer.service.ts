import { Injectable } from '@nestjs/common';
import { Result, err, ok } from 'src/common/result';
import { AuctioneerNotFoundError } from '../errors/AuctioneerNotFound.error';
import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';
import { Auctioneer } from '../Auctioneer';

@Injectable()
export default class FindAuctioneerService {
  constructor(private readonly repo: IAuctioneerRepository) {}

  async execute(
    id: string,
  ): Promise<Result<Auctioneer, AuctioneerNotFoundError>> {
    const auctioneer = await this.repo.findById(id);

    if (!auctioneer) return err(new AuctioneerNotFoundError());

    return ok(auctioneer);
  }
}
