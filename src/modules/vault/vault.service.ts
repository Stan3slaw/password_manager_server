import { Injectable } from '@nestjs/common';
import type { ObjectId } from 'mongoose';

import { VaultRepository } from './vault.repository';
import type { UpdateVaultDto } from './dtos/update-vault.dto';
import type { VaultDocument } from './schemas/vault.schema';
import type { CreateVaultDto } from './dtos/create-vault.dto';

@Injectable()
export class VaultService {
  constructor(private readonly vaultRepository: VaultRepository) {}

  async create(createVaultDto: CreateVaultDto): Promise<VaultDocument> {
    const createdVault = await this.vaultRepository.create(createVaultDto);

    return createdVault;
  }

  async update(
    userId: ObjectId,
    updateVaultDto: UpdateVaultDto,
  ): Promise<VaultDocument> {
    const updatedVault = await this.vaultRepository.update(
      userId,
      updateVaultDto,
    );

    return updatedVault;
  }

  async findOneByUserId(userId: ObjectId): Promise<VaultDocument> {
    const foundVault = await this.vaultRepository.findVaultByUserId(userId);

    return foundVault;
  }
}
