import {
  FileFieldsInterceptor,
  MemoryStorageFile,
  UploadedFiles,
} from '@blazity/nest-file-fastify';
import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard, JwtAuthRequest } from '../auth/jwt-auth.guard';
import { ProfileDto } from './dto/profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: JwtAuthRequest) {
    return this.usersService.getProfile(req.user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'skin', maxCount: 1 },
      { name: 'cape', maxCount: 1 },
    ]),
  )
  async updateProfile(
    @Request() req: JwtAuthRequest,
    @Body() profile: ProfileDto,
    @UploadedFiles()
    files: { skin?: MemoryStorageFile[]; cape?: MemoryStorageFile[] },
  ) {
    await this.usersService.updateProfile(
      req.user,
      profile,
      files.skin,
      files.cape,
    );
  }
}
