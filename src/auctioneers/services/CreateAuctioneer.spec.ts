import { Test } from '@nestjs/testing';
import CreateAuctioneerService from './CreateAuctioneer.service';
import { IAuctioneerRepository } from '../repositories/auctioneer.repository.interface';
import { makeAuctioneerData } from 'test/factories/auctioneer.factory';
describe('CreateAuctioneerService', () => {
  let useCase: CreateAuctioneerService;

  const mockRepo = {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateAuctioneerService,
        { provide: IAuctioneerRepository, useValue: mockRepo },
      ],
    }).compile();

    useCase = module.get(CreateAuctioneerService);
    jest.clearAllMocks();
  });

  it('chama repo.create com entity válida', async () => {
    mockRepo.create.mockResolvedValue(undefined);

    await useCase.execute(makeAuctioneerData());

    expect(mockRepo.create).toHaveBeenCalledTimes(1);
  });

  it('lança erro se email inválido', async () => {
    await expect(
      useCase.execute(makeAuctioneerData({ email: ['invalido'] })),
    ).rejects.toThrow();
  });
});
