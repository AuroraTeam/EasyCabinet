import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { login, password }: AuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      login,
      password,
    );

    this.authService.setRefreshTokenCookie(response, refreshToken);
    return { accessToken };
  }

  @Post('register')
  register(@Body() data: AuthDto) {
    return this.authService.register(data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const oldRefreshToken = req.cookies.refreshToken;
    response.clearCookie('refreshToken');

    if (!oldRefreshToken) {
      return;
    }

    const parsedRefreshToken = req.unsignCookie(oldRefreshToken);

    if (!parsedRefreshToken.valid) {
      return;
    }

    this.authService.logout(parsedRefreshToken.value);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      throw new BadRequestException('No refresh token');
    }

    const parsedRefreshToken = req.unsignCookie(oldRefreshToken);

    if (!parsedRefreshToken.valid) {
      throw new BadRequestException('Invalid refresh token');
    }

    const { accessToken, refreshToken } = await this.authService.refresh(
      parsedRefreshToken.value,
    );

    this.authService.setRefreshTokenCookie(response, refreshToken);
    return { accessToken };
  }
}
