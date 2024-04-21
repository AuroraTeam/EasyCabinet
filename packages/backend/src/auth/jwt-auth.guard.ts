import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';

import { JwtPayload } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export type JwtAuthRequest = FastifyRequest & {
  user: JwtPayload;
};
