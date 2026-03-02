import { Prisma } from 'src/generated/prisma/client';
import { Role } from 'src/generated/prisma/enums';
import { CreateUserDTO } from './interfaces/createUserDTO';

export default class MapUserToPrisma {
  static execute(dto: CreateUserDTO): Prisma.UserCreateInput {
    return {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role ?? Role.USER,
    };
  }
}
