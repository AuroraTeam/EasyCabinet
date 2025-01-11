import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  resetToken: string;

  @IsNotEmpty()
  password: string;
}
