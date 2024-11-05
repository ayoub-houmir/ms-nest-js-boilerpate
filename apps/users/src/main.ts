import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('UsersMicroservice');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.PORT) || 4001,
      },
    },
  );

  app.listen().then(() => {
    logger.log(`Users Microservice is listening on port ${process.env.PORT || 4001}`);
  });
}
bootstrap();
