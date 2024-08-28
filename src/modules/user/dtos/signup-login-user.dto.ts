import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

import { MAX_EMAIL_CHARACTERS, MAX_PASSWORD_CHARACTERS } from '../constants';

export class SignupLoginUserDto {
  @MaxLength(MAX_EMAIL_CHARACTERS, {
    message: `email max length is ${MAX_EMAIL_CHARACTERS} characters`,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
