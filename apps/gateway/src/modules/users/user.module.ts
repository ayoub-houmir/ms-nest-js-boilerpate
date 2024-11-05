import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './controllers/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('USER_SERVICE_HOST', 'localhost'),
            port: configService.get('USER_SERVICE_PORT', 4001),
            retryAttempts: 5,
            retryDelay: 1000,
            timeout: 5000,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {} 