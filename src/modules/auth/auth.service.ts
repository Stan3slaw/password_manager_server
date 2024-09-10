import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { verify } from 'argon2';

import type { Response } from 'express';

import { UserService } from '../user/user.service';
import type { SignUpSignInDto } from './dtos/sign-up-sign-in.dto';
import { generateSalt } from '../../common/utils/generate-salt.util';
import { VaultService } from '../vault/vault.service';
import type { AuthResponseDto } from './dtos/auth-response.dto';
import { COOKIE_DOMAIN } from '../../common/config/cookie.config';
import type { UserDocument } from '../user/schemas/user.schema';
import type { GetCurrentUserResponseDto } from './dtos/get-current-user-response.dto';

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
      id: userId,
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
      id: userId,
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

  async signOut(response: Response): Promise<void> {
    response.clearCookie('access-token', {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: false,
    });
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User with specified email does not exists');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new BadRequestException('Incorrect password');
    }

    // TODO: Omit password from user response
    return user;
  }

  async getCurrentUser(userEmail: string): Promise<GetCurrentUserResponseDto> {
    const user = await this.userService.findOneByEmail(userEmail);

    if (!user) {
      throw new UnauthorizedException();
    }
    const { id, email } = user;

    return { id, email };
  }
}
