import { Body, Controller, Post, UseFilters } from '@nestjs/common';

import { AuthDto } from '../auth/dto/auth.dto';
import { AuroraService } from './aurora.service';
import { HasJoinedDto } from './dto/hasJoined.dto';
import { JoinDto } from './dto/join.dto';
import { ProfileDto } from './dto/profile.dto';
import { ProfilesDto } from './dto/profiles.dto';
import { HttpExceptionFilter } from './exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('aurora')
export class AuroraController {
  constructor(private readonly auroraService: AuroraService) {}

  @Post('auth')
  async auth(@Body() { login, password }: AuthDto) {
    return this.returnResult(await this.auroraService.auth(login, password));
  }

  @Post('join')
  async join(@Body() body: JoinDto) {
    return this.returnResult(await this.auroraService.join(body));
  }

  @Post('hasJoined')
  async hasJoined(@Body() body: HasJoinedDto) {
    return this.returnResult(await this.auroraService.hasJoined(body));
  }

  @Post('profile')
  async profile(@Body() body: ProfileDto) {
    return this.returnResult(await this.auroraService.profile(body));
  }

  @Post('profiles')
  async profiles(@Body() body: ProfilesDto) {
    return this.returnResult(await this.auroraService.profiles(body));
  }

  // @Post('logout')
  // logout() {}

  // @Post('refresh')
  // refresh() {}

  returnResult(result: any) {
    return { success: true, result };
  }
}
