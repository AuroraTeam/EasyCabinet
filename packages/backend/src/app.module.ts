import { join } from 'path';

import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';

import { AppController } from './app.controller';
import { AuroraModule } from './aurora/aurora.module';
import { IgnoreCorsMiddleware } from './aurora/cors.middleware';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
    AuthModule,
    AuroraModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const useSendmail =
          configService.get('USE_SENDMAIL', 'false') == 'true';

        const user = configService.get('SMTP_USER');
        if (!user) {
          throw new Error('SMTP_USER are required');
        }

        let transport = null;
        if (useSendmail) {
          transport = { sendmail: true };
        } else {
          const host = configService.get('SMTP_HOST');
          const port = +configService.get('SMTP_PORT', 587);
          const secure =
            configService.get('SMTP_SECURE', port === 465) == 'true';

          if (!host) {
            throw new Error('SMTP_HOST are required');
          }

          const pass = configService.get('SMTP_PASS');
          if (!pass) {
            throw new Error('SMTP_PASS are required');
          }

          transport = { host, port, secure, auth: { user, pass } };
        }

        return {
          transport,
          defaults: { from: user },
          template: {
            dir: join(__dirname, 'emails'),
            adapter: new ReactAdapter(),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IgnoreCorsMiddleware).forRoutes('aurora');
  }
}
