import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/interfaces/createUserDTO';
import { CreateUserService } from 'src/users/services/CreateUser.service';
import SignInService from './SignIn.service';

@Injectable()
export default class RegisterUserService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly signinService: SignInService,
  ) {}

  async execute(dto: CreateUserDTO) {
    await this.createUserService.execute(dto);
    return await this.signinService.execute(dto.email, dto.password);
  }
}
