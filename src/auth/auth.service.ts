// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CryptoService } from '../crypto/crypto.service';
import { JwtPayload } from './jwt.payload';
import { CreateUserDto } from 'src/users/createUserDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly crypto: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
  }

  private async generateTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: process.env.NODE_ENV === 'production' ? '15m' : '1d',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isValid = await this.crypto.verify(user.password, pass);
    if (!isValid) throw new UnauthorizedException();

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async register(dto: CreateUserDto) {
    await this.usersService.create(dto);
    return await this.signIn(dto.email, dto.password);
  }

  async refreshWithToken(refreshToken: string) {
    const decoded = this.jwtService.decode<JwtPayload>(refreshToken);
    if (!decoded?.sub) throw new UnauthorizedException();

    const user = await this.usersService.findById(decoded.sub);
    if (!user?.refreshToken) throw new UnauthorizedException();

    const isValid = await this.crypto.verify(user.refreshToken, refreshToken);
    if (!isValid) throw new UnauthorizedException();

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
