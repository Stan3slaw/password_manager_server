import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVaultDto {
  @IsNotEmpty()
  @IsString()
  readonly encryptedVault: string;
}
