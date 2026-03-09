import { Injectable } from '@nestjs/common';
import { Result, err, ok } from 'src/common/result';
import { Auctioneer } from '../Auctioneer';
import { AuctioneerNotFoundError } from '../errors/AuctioneerNotFound.error';
import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';

type UpdateData = { id: string; auctioneer: Partial<Auctioneer> };

@Injectable()
export default class UpdateAuctioneerService {
  constructor(private readonly repo: IAuctioneerRepository) {}

  async execute(
    data: UpdateData,
  ): Promise<Result<Auctioneer, AuctioneerNotFoundError>> {
    const exists = await this.repo.findById(data.id);

    if (!exists) return err(new AuctioneerNotFoundError());

    const updated = await this.repo.update(data);
    return ok(updated);
  }
}
