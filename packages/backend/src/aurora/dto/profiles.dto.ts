import { IsArray } from 'class-validator';

export class ProfilesDto {
  @IsArray()
  usernames: string[];
}
