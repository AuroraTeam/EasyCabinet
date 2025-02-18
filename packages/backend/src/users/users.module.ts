import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssetsModule } from 'src/assets/assets.module';

import { PrismaService } from './prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
  imports: [ConfigModule, AssetsModule],
  exports: [UsersService],
})
export class UsersModule {}
