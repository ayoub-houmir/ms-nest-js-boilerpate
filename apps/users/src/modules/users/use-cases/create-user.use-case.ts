import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Result } from '@app/core/types/result.type';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: UserDto): Promise<Result<UserDto>> {
    try {
      this.logger.log(`Creating user with email: ${dto.email}`);

      // Create domain entity
      const userResult = User.create({
        id: dto.id,
        email: dto.email,
        name: dto.name,
        password: dto.password,
        createdAt: dto.createdAt || new Date(),
        updatedAt: dto.updatedAt || new Date()
      });

      console.log('userResult', userResult);

      if (userResult.isFailure) {
        return Result.fail(userResult.error);
      }

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(dto.email);
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
      return Result.ok(UserDto.fromDomain(user));

    } catch (error) {
      console.log('error', error);
      this.logger.error(`Error creating user: ${error.message}`);
      return Result.fail(error);
    }
  }
} 