import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class IgnoreCorsMiddleware implements NestMiddleware {
  use(_: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }
}
