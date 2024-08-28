import { registerDecorator } from 'class-validator';
import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { Types } from 'mongoose';

export function IsMongoObjectId(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsMongoObjectId',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any) {
          return Types.ObjectId.isValid(value);
        },
        defaultMessage: (validationArguments: ValidationArguments): string => {
          const field = validationArguments.property;

          return `${field} should be an ObjectId`;
        },
      },
    });
  };
}
