import { join } from 'node:path';

import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CacheableMemory } from 'cacheable';
import { Keyv } from 'keyv';
import KeyvFile from 'keyv-file';

import { EmailsModule } from '../emails/emails.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    ConfigModule,
    EmailsModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const stores = [new Keyv({ store: new CacheableMemory() })];

        const redisUrl = configService.get<string>('REDIS_URL');
        if (redisUrl) {
          stores.push(createKeyv(redisUrl));
        } else {
          stores.push(
            new Keyv({
              store: new KeyvFile({
                filename: join(__dirname, '../../cache/auth.json'),
              }),
            }),
          );
        }

        return { stores };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'secret'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '30m') },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
