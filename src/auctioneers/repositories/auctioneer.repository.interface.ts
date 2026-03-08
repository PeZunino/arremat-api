import { Auctioneer } from '../Auctioneer';

export interface IAuctioneerRepository {
  findById(id: string): Promise<Auctioneer | null>;
  get(): Promise<Auctioneer[]>;
  create(data: Auctioneer): Promise<Auctioneer>;
  update(data: Partial<Auctioneer>): Promise<Auctioneer>;
  delete(id: string): Promise<void>;
}

export const AUCTIONEER_REPOSITORY = 'AUCTIONEER_REPOSITORY';
