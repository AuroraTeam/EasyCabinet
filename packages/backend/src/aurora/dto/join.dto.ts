import { IsNotEmpty } from 'class-validator';

export class JoinDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  userUUID: string;

  @IsNotEmpty()
  serverID: string;
}
