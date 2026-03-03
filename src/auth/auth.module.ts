import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CryptoModule } from 'src/crypto/crypto.module';
import GenerateTokenService from './services/GenerateToken.service';
import LogoutService from './services/Logout.service';
import RegisterUserService from './services/Register.service';
import UpdateRefreshTokenService from './services/UpdateRefreshToken.service';
import SignInService from './services/SignIn.service';

@Module({
  controllers: [AuthController],
  providers: [
    GenerateTokenService,
    LogoutService,
    RegisterUserService,
    SignInService,
    UpdateRefreshTokenService,
    RefreshStrategy,
    JwtStrategy,
  ],
  imports: [
    CryptoModule,
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
      }),
    }),
  ],
})
export class AuthModule {}
