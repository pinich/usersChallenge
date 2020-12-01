import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  Logger.log(`Listening on port ${port}`,'Main')
  await app.listen(port);
}
bootstrap();
