import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './createUserDTO';
import { Role } from 'src/generated/prisma/enums';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}

  async create(dto: CreateUserDto) {
    const hashed = await this.crypto.hash(dto.password);

    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashed,
        role: dto.role ?? Role.USER,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    const hashed = refreshToken ? await this.crypto.hash(refreshToken) : null;

    return this.prisma.user.update({
      where: { id },
      data: { refreshToken: hashed },
    });
  }
}
