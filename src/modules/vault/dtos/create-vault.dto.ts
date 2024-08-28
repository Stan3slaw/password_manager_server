import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

import { IsMongoObjectId } from '../../../common/decorators/is-mongo-object-id.decorator';

export class CreateVaultDto {
  @IsNotEmpty()
  @IsMongoObjectId()
  readonly userId: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly salt: string;
}
