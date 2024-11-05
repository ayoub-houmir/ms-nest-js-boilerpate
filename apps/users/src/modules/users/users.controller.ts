import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from './dtos/user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { Result } from '@app/core/types/result.type';

@Controller()
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @MessagePattern('users.create')
  async createUser(@Payload() dto: UserDto): Promise<Result<UserDto>> {
    return this.createUserUseCase.execute(dto);
  }
} 