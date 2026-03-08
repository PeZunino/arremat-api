import { Auctioneer } from '../Auctioneer';

export abstract class IAuctioneerRepository {
  abstract create(auctioneer: Auctioneer): Promise<Auctioneer>;
  abstract findById(id: string): Promise<Auctioneer | null>;
  abstract findByEmail(email: string): Promise<Auctioneer | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(data: Partial<Auctioneer>): Promise<Auctioneer>;
  abstract get(): Promise<Auctioneer[]>;
}
