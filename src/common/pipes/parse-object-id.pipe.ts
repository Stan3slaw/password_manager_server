import type { PipeTransform } from '@nestjs/common';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return Types.ObjectId.createFromHexString(value);
  }
}
