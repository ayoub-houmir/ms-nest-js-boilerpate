import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from './dtos/user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { Result } from '@app/core/types/result.type';
import { CreateUserRequest } from '@app/common/dtos/users/requests/create-user.request';
import { CreateUserResponse } from '@app/common/dtos/users/responses/create-user.response';

@Controller()
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @MessagePattern('users.create')
  async createUser(@Payload() dto: CreateUserRequest): Promise<Result<CreateUserResponse>> {
    return this.createUserUseCase.execute(dto);
  }
} 