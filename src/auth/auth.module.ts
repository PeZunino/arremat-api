import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthRefreshStrategy } from './strategies/refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CryptoModule } from 'src/crypto/crypto.module';
import AuthGenerateTokenService from './services/AuthGenerateToken.service';
import AuthLogoutService from './services/AuthLogout.service';
import AuthRegisterUserService from './services/AuthRegister.service';
import AuthUpdateRefreshTokenService from './services/AuthUpdateRefreshToken.service';
import AuthSignInService from './services/AuthSignIn.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthGenerateTokenService,
    AuthLogoutService,
    AuthRegisterUserService,
    AuthSignInService,
    AuthUpdateRefreshTokenService,
    AuthRefreshStrategy,
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
