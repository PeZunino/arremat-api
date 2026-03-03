import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUserRepository } from './user.repository.interface';
import MapUserToPrisma from '../user.mapper';
import { User } from 'src/generated/prisma/client';
import { CreateUserDTO } from '../interfaces/createUserDTO';
import { Optional } from '@prisma/client/runtime/client';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({ data: MapUserToPrisma.execute(data) });
  }

  async update(id: string, data: Optional<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken: refreshToken },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
