require('dotenv').config();
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  /** This parameters could be loaded from .env but for the simplicity they are hardcoded here */
  // origin: ['https://pinich.ddns.net', 'http://localhost:4200'],
  app.enableCors({
    origin: ['https://pinich.ddns.net', 'http://localhost:4200']
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  Logger.log(`Listening on port ${port}`, 'Main')
  await app.listen(port);
}
bootstrap();
