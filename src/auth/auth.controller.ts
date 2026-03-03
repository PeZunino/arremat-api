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
import { FastifyRequest, FastifyReply } from 'fastify';
import { AllowAnon } from './decorators/allow-anon.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './jwt.payload';
import { SkipThrottle } from '@nestjs/throttler';
import UpdateRefreshTokenService from './services/UpdateRefreshToken.service';
import LogoutService from './services/Logout.service';
import RegisterUserService from './services/Register.service';
import { CreateUserDTO } from 'src/users/interfaces/createUserDTO';
import SignInService from './services/SignIn.service';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/auth/refresh',
  maxAge: 60 * 60 * 24 * 7, // 7 dias
};

@SkipThrottle()
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly logoutService: LogoutService,
    private readonly registerUserService: RegisterUserService,
    private readonly signinService: SignInService,
    private readonly updateRefreshTokenService: UpdateRefreshTokenService,
  ) {}

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() dto: { email: string; password: string },
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { accessToken, refreshToken } = await this.signinService.execute(
      dto.email,
      dto.password,
    );

    res.setCookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    return { accessToken };
  }

  @AllowAnon()
  @Post('register')
  async register(
    @Body() dto: CreateUserDTO,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { accessToken, refreshToken } =
      await this.registerUserService.execute(dto);

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
      await this.updateRefreshTokenService.execute(refreshToken);

    res.setCookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);

    return { accessToken };
  }

  @Post('logout')
  async logout(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    await this.logoutService.execute(user.sub);
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
  }
}
