import { Injectable } from '@nestjs/common';
import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';
import { AuctioneerNotFoundError } from '../errors/AuctioneerNotFound.error';
import { Result, err, ok } from 'src/common/result';

@Injectable()
export default class DeleteAuctioneerService {
  constructor(private readonly repo: IAuctioneerRepository) {}

  async execute(id: string): Promise<Result<void, AuctioneerNotFoundError>> {
    const auctioneer = await this.repo.findById(id);

    if (!auctioneer) return err(new AuctioneerNotFoundError());

    await this.repo.delete(id);
    return ok(undefined);
  }
}
