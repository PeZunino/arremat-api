import { User } from 'src/generated/prisma/client';
import { CreateUserDTO } from '../interfaces/createUserDTO';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  updateRefreshToken(id: string, refreshToken: string | null): Promise<User>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
