import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class AuthsGenerateTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(payload: JwtPayload) {
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
}
