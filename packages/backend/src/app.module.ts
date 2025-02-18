import { join } from 'path';

import { MailerModule } from '@nestjs-modules/mailer';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';

import { AppController } from './app.controller';
import { AssetsModule } from './assets/assets.module';
import { AuroraModule } from './aurora/aurora.module';
import { IgnoreCorsMiddleware } from './aurora/cors.middleware';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AuroraModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const useSendmail =
          configService.get<string>('USE_SENDMAIL', 'false') == 'true';

        const user = configService.get<string>('SMTP_USER');
        if (!user) {
          throw new Error('SMTP_USER are required');
        }

        let transport: TransportType;
        if (useSendmail) {
          transport = { sendmail: true };
        } else {
          const host = configService.get<string>('SMTP_HOST');
          const port = +configService.get<string>('SMTP_PORT', '587');
          const secure =
            configService.get<string>('SMTP_SECURE', String(port === 465)) ==
            'true';

          if (!host) {
            throw new Error('SMTP_HOST are required');
          }

          const pass = configService.get<string>('SMTP_PASS');
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
    }) as never,
    FilesModule,
    AssetsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IgnoreCorsMiddleware).forRoutes('aurora');
  }
}
