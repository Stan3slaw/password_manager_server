import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { ObjectId } from 'mongoose';
import { Model } from 'mongoose';

import type { VaultDocument } from './schemas/vault.schema';
import { Vault } from './schemas/vault.schema';
import type { UpdateVaultDto } from './dtos/update-vault.dto';
import type { CreateVaultDto } from './dtos/create-vault.dto';

@Injectable()
export class VaultRepository {
  constructor(
    @InjectModel(Vault.name) private readonly vaultModel: Model<VaultDocument>,
  ) {}

  async create(createVaultDto: CreateVaultDto): Promise<VaultDocument> {
    const vault = new this.vaultModel(createVaultDto);
    const savedVault = await vault.save();

    return savedVault;
  }

  async update(
    userId: ObjectId,
    updateVaultDto: UpdateVaultDto,
  ): Promise<VaultDocument> {
    const updatedVault = await this.vaultModel.findOneAndUpdate(
      { userId },
      updateVaultDto,
      { new: true },
    );

    return updatedVault;
  }

  async findVaultByUserId(userId: ObjectId): Promise<VaultDocument> {
    const foundVault = await this.vaultModel.findOne({ userId });

    return foundVault;
  }
}
