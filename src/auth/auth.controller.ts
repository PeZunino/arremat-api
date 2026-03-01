import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/createUserDTO';
import { AllowAnon } from './decorators/allow-anon.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JwtPayload } from './jwt.payload';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/auth/refresh',
  maxAge: 60 * 60 * 24 * 7, // 7 dias
};

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() dto: { email: string; password: string },
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      dto.email,
      dto.password,
    );

    res.setCookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    return { accessToken };
  }

  @AllowAnon()
  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { accessToken, refreshToken } = await this.authService.register(dto);

    res.setCookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    return { accessToken };
  }

  @AllowAnon()
  @Post('refresh')
  async refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) throw new UnauthorizedException();

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshWithToken(refreshToken);

    res.setCookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);

    return { accessToken };
  }

  @Post('logout')
  async logout(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    await this.authService.logout(user.sub);
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
  }
}
