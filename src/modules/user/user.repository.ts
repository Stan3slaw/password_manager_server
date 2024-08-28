import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { UserDocument } from './schemas/user.schema';
import { User } from './schemas/user.schema';
import type { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    const savedUser = await user.save();

    return savedUser;
  }

  async findOne(userEmail: string): Promise<UserDocument> {
    const [user] = await this.userModel.find({
      email: userEmail,
    });

    return user;
  }
}
