import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/users/repositories/user.repository.interface';
import { CryptoService } from 'src/crypto/crypto.service';
import GenerateTokenService from './AuthGenerateToken.service';

@Injectable()
export default class AuthSignInService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    private readonly cryptoService: CryptoService,
    private readonly generateTokenService: GenerateTokenService,
  ) {}

  async execute(email: string, pass: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isValid = await this.cryptoService.verify(user.password, pass);
    if (!isValid) throw new UnauthorizedException();

    const { accessToken, refreshToken } =
      await this.generateTokenService.execute({
        email: user.email,
        role: user.role,
        sub: user.id,
      });

    await this.usersRepository.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
