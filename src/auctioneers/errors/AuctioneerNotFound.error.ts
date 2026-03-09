import { DomainError } from 'src/common/domain-error';

export class AuctioneerNotFoundError extends DomainError {
  statusCode = 404;

  constructor() {
    super('Auctioneer not found');
  }
}
