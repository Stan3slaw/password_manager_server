import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseDateISOStringPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): any {
    if (typeof value === 'object') {
      const keys = Object.keys(value);
      const convertedObject = {};

      for (const key of keys) {
        convertedObject[key] = new Date(value[key]).toISOString();
      }

      return convertedObject;
    }

    return new Date(value).toISOString();
  }
}
