import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
// import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    // GetUserUseCase,
  ],
})
export class UsersModule {} 