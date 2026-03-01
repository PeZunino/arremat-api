import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
