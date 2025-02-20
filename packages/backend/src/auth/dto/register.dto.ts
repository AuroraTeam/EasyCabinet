import { IsEmail, IsNotEmpty } from 'class-validator';

import { IsMinecraftUsername } from './IsMinecraftUsername';

export class RegisterDto {
  @IsNotEmpty()
  @IsMinecraftUsername()
  login: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
