import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { S3Module } from 'nestjs-s3';

import { AppController } from './app.controller';
import { AuroraModule } from './aurora/aurora.module';
import { IgnoreCorsMiddleware } from './aurora/cors.middleware';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, CacheModule.register()],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [User],
        synchronize: configService.get('DEV') === 'true',
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
          },
          region: configService.get('S3_REGION'),
          endpoint: configService.get('S3_ENDPOINT'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AuroraModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IgnoreCorsMiddleware).forRoutes('aurora');
  }
}
