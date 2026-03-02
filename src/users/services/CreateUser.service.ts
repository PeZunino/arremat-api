import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../repositories/user.repository.interface';
import { IUserRepository } from '../repositories/user.repository.interface';
import { CreateUserDTO } from '../interfaces/createUserDTO';
import { CryptoService } from 'src/crypto/crypto.service';
import { Role } from '../interfaces/Role.enum';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly crypto: CryptoService,
  ) {}

  async execute(dto: CreateUserDTO) {
    const hashed = await this.crypto.hash(dto.password);

    return this.userRepository.create({
      ...dto,
      password: hashed,
      role: dto.role ?? Role.USER,
    });
  }
}
