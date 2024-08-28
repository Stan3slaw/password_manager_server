import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
