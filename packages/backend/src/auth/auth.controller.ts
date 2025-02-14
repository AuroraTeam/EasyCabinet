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
import { ChangePasswordDto } from './dto/changePassword.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { login, password }: LoginDto,
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
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('reset-password')
  resetPassword(@Body() { email }: ResetPasswordDto) {
    return this.authService.resetPassword(email);
  }

  @Post('change-password')
  changePassword(@Body() { resetToken, password }: ChangePasswordDto) {
    return this.authService.changePassword(resetToken, password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
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

    await this.authService.logout(parsedRefreshToken.value);
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
