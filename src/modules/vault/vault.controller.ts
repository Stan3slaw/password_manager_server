import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { User } from '../../common/decorators/user.decorator';
import { UpdateVaultDto } from './dtos/update-vault.dto';
import { VaultService } from './vault.service';
import type { VaultDocument } from './schemas/vault.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @UseGuards(JwtGuard)
  @Put()
  async update(
    @User('id') currentUserId: ObjectId,
    @Body() updateVaultDto: UpdateVaultDto,
  ): Promise<VaultDocument> {
    return this.vaultService.update(currentUserId, updateVaultDto);
  }
}
