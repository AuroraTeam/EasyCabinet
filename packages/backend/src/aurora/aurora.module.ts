import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AuroraController } from './aurora.controller';
import { AuroraService } from './aurora.service';

@Module({
  controllers: [AuroraController],
  providers: [AuroraService],
  imports: [UsersModule, AuthModule],
})
export class AuroraModule {}
