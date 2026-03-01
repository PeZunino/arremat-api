import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/createUserDTO';
import { AllowAnon } from './decorators/allow-anon.decorator';
import { RefreshGuard } from './guards/refresh.guard';
import type { JwtPayload } from './jwt.payload';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: CreateUserDto) {
    return this.authService.signIn(dto.email, dto.password);
  }

  @AllowAnon()
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @AllowAnon()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  refresh(@CurrentUser() user: JwtPayload & { refreshToken: string }) {
    return this.authService.refresh(user.sub, user.refreshToken);
  }

  @Post('logout')
  logout(@CurrentUser() user: JwtPayload) {
    return this.authService.logout(user.sub);
  }
}
