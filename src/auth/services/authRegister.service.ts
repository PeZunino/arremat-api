import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/interfaces/createUserDTO';
import { CreateUserService } from 'src/users/services/CreateUser.service';

@Injectable()
export default class AuthRegisterUserService {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(dto: CreateUserDTO) {
    return await this.createUserService.execute(dto);
  }
}
