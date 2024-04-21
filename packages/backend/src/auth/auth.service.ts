import { randomUUID } from 'crypto';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Cache } from 'cache-manager';
import { FastifyReply } from 'fastify';

import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload, JwtPayloadExtra } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async verifyAuth(login: string, password: string) {
    const user = await this.usersService.findUser({ login });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!(await this.checkPassword(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  public async login(login: string, password: string) {
    const user = await this.verifyAuth(login, password);
    return this.generateTokensPair({ uuid: user.uuid, login });
  }

  public async register(data: AuthDto): Promise<any> {
    if (await this.usersService.checkIfUserExists(data)) {
      throw new BadRequestException('User already exists');
    }

    data.password = await this.hashPassword(data.password);
    await this.usersService.createUser(data);
  }

  public async logout(refreshToken: string) {
    // В данной функции нам нет смысла возвращать пользователю ошибки
    try {
      await this.checkAndRemoveToken(refreshToken);
    } catch (error) {
      // ignore
    }
  }

  public async refresh(refreshToken: string) {
    const userData = await this.checkAndRemoveToken(refreshToken);
    return this.generateTokensPair(userData);
  }

  // Methods

  public getTokenFromBlacklist(accessToken: string) {
    return this.cacheManager.get(`accessToken:${accessToken}`);
  }

  private addTokenToBlacklist(accessToken: string, ttl: number) {
    return this.cacheManager.set(`accessToken:${accessToken}`, 1, ttl);
  }

  private getRefreshTokenData(refreshToken: string) {
    return this.cacheManager.get<string>(`refreshToken:${refreshToken}`);
  }

  private deleteRefreshToken(refreshToken: string) {
    return this.cacheManager.del(`refreshToken:${refreshToken}`);
  }

  private async checkAndRemoveToken(refreshToken: string) {
    const accessToken = await this.getRefreshTokenData(refreshToken);
    if (!accessToken) throw new BadRequestException('Токен не найден');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...userData } =
      this.jwtService.decode<JwtPayloadExtra>(accessToken);

    const ttl = exp * 1000 - Date.now();
    if (ttl > 0) {
      await this.addTokenToBlacklist(accessToken, ttl);
    }

    await this.deleteRefreshToken(refreshToken);

    return userData;
  }

  private async generateTokensPair(user: JwtPayload) {
    const accessToken = this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(accessToken);
    return { accessToken, refreshToken };
  }

  private createAccessToken(user: JwtPayload) {
    return this.jwtService.sign(user);
  }

  private async createRefreshToken(accessToken: string) {
    const refreshToken = randomUUID();

    await this.cacheManager.set(
      `refreshToken:${refreshToken}`,
      accessToken,
      this.configService.get('COOKIE_EXPIRES_IN', 2592000) * 1000,
    );

    return refreshToken;
  }

  public setRefreshTokenCookie(response: FastifyReply, refreshToken: string) {
    response.setCookie('refreshToken', refreshToken, {
      signed: true,
      httpOnly: true,
      secure: this.configService.get('COOKIE_SECURE', 'false') === 'true',
      domain: this.configService.get('COOKIE_DOMAIN', 'localhost'),
      path: '/auth',
      maxAge: this.configService.get('COOKIE_EXPIRES_IN', 2592000), // 30 days
    });
  }

  public hashPassword(password: string) {
    return hash(password, 10);
  }

  public checkPassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
}
