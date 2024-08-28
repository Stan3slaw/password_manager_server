import { Body, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';

import { SignUpSignInDto } from './dtos/sign-up-sign-in.dto';
import { AuthService } from './auth.service';
import type { AuthResponseDto } from './dtos/auth-response.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpSignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpDto, response);
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignUpSignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(signInDto, response);
  }

  @UseGuards(JwtGuard)
  @Get('check-auth')
  async getCurrentUser(): Promise<void> {
    console.log('check auth');
  }
}
