import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    transform: true
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Gateway is running on port ${port}`);
}
bootstrap();
