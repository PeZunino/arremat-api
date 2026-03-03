import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/crypto/crypto.module';
import { UserPrismaRepository } from './repositories/user.prisma.repository';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { CreateUserService } from './services/CreateUser.service';
import { UpdateRefreshTokenService } from './services/UpdateRefreshToken.service';

@Module({
  providers: [
    UpdateRefreshTokenService,
    CreateUserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UpdateRefreshTokenService, CreateUserService, USER_REPOSITORY],
  imports: [CryptoModule],
})
export class UsersModule {}
