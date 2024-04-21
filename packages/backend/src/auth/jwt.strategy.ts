import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: FastifyRequest, payload: JwtPayload) {
    const token = await this.authService.getTokenFromBlacklist(
      req.headers.authorization.split(' ')[1],
    );

    if (token) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}

export type JwtPayload = { uuid: string; login: string };
export type JwtPayloadExtra = JwtPayload & { exp: number; iat: number };
