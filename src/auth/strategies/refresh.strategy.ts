import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { JwtPayload } from '../jwt.payload';
import type { IncomingMessage } from 'http';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(
    req: IncomingMessage,
    payload: JwtPayload,
  ): JwtPayload & { refreshToken: string } {
    const auth = req.headers.authorization;
    const refreshToken = auth?.split(' ')[1];

    if (!refreshToken) throw new UnauthorizedException();

    return { ...payload, refreshToken };
  }
}
