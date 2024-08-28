import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { VaultModule } from './modules/vault/vault.module';
import { UserModule } from './modules/user/user.module';
import { mongooseConfig } from './common/db/mongodb/configuration/mongoose.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtConfig } from './modules/auth/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [JwtConfig],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, mongooseConfig),
    AuthModule,
    VaultModule,
    UserModule,
  ],
})
export class AppModule {}
