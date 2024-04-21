import { IsNotEmpty } from 'class-validator';

export class HasJoinedDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  serverID: string;
}
