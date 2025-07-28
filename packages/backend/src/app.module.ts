import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AssetsModule } from './assets/assets.module';
import { AuroraModule } from './aurora/aurora.module';
import { IgnoreCorsMiddleware } from './aurora/cors.middleware';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './emails/emails.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AuroraModule,
    FilesModule,
    AssetsModule,
    EmailsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IgnoreCorsMiddleware).forRoutes('aurora');
  }
}
