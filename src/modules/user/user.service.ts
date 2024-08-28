import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

import { UserRepository } from './user.repository';
import type { CreateUserDto } from './dtos/create-user.dto';
import type { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneByEmail(userEmail: string): Promise<UserDocument> {
    const foundUser = await this.userRepository.findOne(userEmail);

    return foundUser;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userRepository.create(createUserDto);

    return createdUser;
  }
}
