import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Result } from '@app/core/types/result.type';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UseCase } from '@app/core/base/use-case.base';
import { CreateUserRequest } from '@app/common/dtos/users/requests/create-user.request';
import { CreateUserResponse } from '@app/common/dtos/users/responses/create-user.response';

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, CreateUserResponse> {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<Result<CreateUserResponse>> {
    try {
      this.logger.log(`Creating user with email: ${request.email}`);

      // Create domain entity
      const userResult = User.create({ ...request, createdAt: new Date(), updatedAt: new Date() });
      if (userResult.isFailure) {
        return Result.fail(userResult.error);
      }

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(userResult.value.email);
      if (existingUser) {
        return Result.fail(new Error('User already exists'));
      }

      // Save to repository
      const savedResult = await this.userRepository.create(userResult.value);
      console.log('savedResult', savedResult);
      if (savedResult.isFailure) {
        return Result.fail(savedResult.error);
      }

      console.log('savedResult.value', savedResult.value);
      const user = savedResult.value;
      // Convert back to DTO
      console.log('UserDto.fromDomain(savedResult.value)', UserDto.fromDomain(user));
      return Result.ok(UserDto.fromDomain(user) as CreateUserResponse);

    } catch (error) {
      console.log('error', error);
      this.logger.error(`Error creating user: ${error.message}`);
      return Result.fail(error);
    }
  }
} 