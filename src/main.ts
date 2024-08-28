import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { corsOptions } from './common/config/cors.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: false, forbidNonWhitelisted: false }),
  );

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
