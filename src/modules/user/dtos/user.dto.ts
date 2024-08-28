import type { ObjectId } from 'mongoose';

export type UserWithPasswordDto = {
  id: ObjectId;
  email: string;
  password: string;
};

export type UserDto = Omit<UserWithPasswordDto, 'password'>;
