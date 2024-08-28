import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { VaultController } from './vault.controller';
import { VaultService } from './vault.service';
import { VaultSchema } from './schemas/vault.schema';
import { VaultRepository } from './vault.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vault', schema: VaultSchema }]),
  ],
  controllers: [VaultController],
  providers: [VaultService, VaultRepository],
  exports: [VaultService],
})
export class VaultModule {}
