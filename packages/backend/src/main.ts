import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  if (!existsSync(join(__filename, '..', 'files'))) {
    mkdirSync(join(__filename, '..', 'files'));
  }

  app.useStaticAssets({
    root: join(__filename, '..', 'files'),
    prefix:"/files/",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const host = configService.get('HOST');
  const port = configService.get('PORT');
  const secret = configService.get('COOKIE_SECRET');
  const frontend = configService.get('FRONTEND_URL');

  app.enableCors({
    origin: [frontend],
    credentials: true,
  });

  await app.register(fastifyMultipart);
  await app.register(fastifyCookie, { secret });
  await app.listen(port, host);
}
bootstrap();
