import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class ProfileDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isAlex: boolean;
}
