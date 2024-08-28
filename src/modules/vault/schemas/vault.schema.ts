import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import type { Document } from 'mongoose';

import { User } from '../../user/schemas/user.schema';

export type VaultDocument = Vault & Document;

@Schema({ timestamps: true })
export class Vault {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ default: '' })
  data: string;

  @Prop({ required: true })
  salt: string;
}

const VaultSchema = SchemaFactory.createForClass(Vault);

VaultSchema.index({});

export { VaultSchema };
