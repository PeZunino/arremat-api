import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../jwt.payload';
import { JwtService } from '@nestjs/jwt';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/users/repositories/user.repository.interface';
import { CryptoService } from 'src/crypto/crypto.service';
import GenerateTokenService from './AuthGenerateToken.service';

@Injectable()
export default class AuthUpdateRefreshTokenService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly generateTokenService: GenerateTokenService,
  ) {}

  async execute(refreshToken: string) {
    const decoded = this.jwtService.decode<JwtPayload>(refreshToken);
    if (!decoded?.sub) throw new UnauthorizedException();

    const user = await this.usersRepository.findById(decoded.sub);
    if (!user?.refreshToken) throw new UnauthorizedException();

    const isValid = await this.cryptoService.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!isValid) throw new UnauthorizedException();

    const tokens = await this.generateTokenService.execute({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.usersRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
