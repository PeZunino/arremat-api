import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CryptoModule } from 'src/crypto/crypto.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [CryptoModule],
})
export class UsersModule {}
