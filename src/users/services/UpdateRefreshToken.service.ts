import { Inject, Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { USER_REPOSITORY } from '../repositories/user.repository.interface';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class UpdateRefreshTokenService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly crypto: CryptoService,
  ) {}

  async execute(id: string, refreshToken: string | null) {
    const hashed = refreshToken ? await this.crypto.hash(refreshToken) : null;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.update(id, { ...user, refreshToken: hashed });
  }
}
