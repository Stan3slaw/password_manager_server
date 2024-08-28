import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { hash, verify } from 'argon2';

import type { Response } from 'express';

import { UserService } from '../user/user.service';
import type { SignUpSignInDto } from './dtos/sign-up-sign-in.dto';
import { generateSalt } from '../../common/utils/generate-salt.util';
import { VaultService } from '../vault/vault.service';
import type { AuthResponseDto } from './dtos/auth-response.dto';
import { COOKIE_DOMAIN } from '../../common/config/cookie.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly vaultService: VaultService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpSignInDto,
    response: Response,
  ): Promise<AuthResponseDto> {
    const existingUser = await this.userService.findOneByEmail(signUpDto.email);

    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    const { _id: userId, email } = await this.userService.create(signUpDto);

    const salt = generateSalt();

    const vault = await this.vaultService.create({ userId, salt });

    const accessToken = await this.jwtService.signAsync({
      userId,
      email,
    });

    response.cookie('access-token', accessToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return {
      vault: vault.data,
      salt,
    };
  }

  async signIn(
    signInDto: SignUpSignInDto,
    response: Response,
  ): Promise<AuthResponseDto> {
    const user = await this.validateUser(signInDto.email, signInDto.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { _id: userId, email } = user;

    const vault = await this.vaultService.findOneByUserId(userId);

    const accessToken = await this.jwtService.signAsync({
      userId,
      email,
    });

    response.cookie('access-token', accessToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return {
      vault: vault?.data,
      salt: vault?.salt,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User with specified email does not exists');
    }

    const hashedPassword = await hash(password);
    const isValidPassword = await verify(user.password, hashedPassword);

    if (!isValidPassword) {
      throw new BadRequestException('Incorrect password');
    }
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
