import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Result } from '@app/core/types/result.type';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class GetUserUseCase {
  private readonly logger = new Logger(GetUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<Result<UserDto>> {
    try {
      this.logger.log(`Getting user with id: ${id}`);
      
      const userResult = await this.userRepository.findById(id);
      
      if (userResult.isFailure) {
        this.logger.error(`Failed to get user: ${userResult.error.message}`);
        return Result.fail(userResult.error);
      }

      if (!userResult.value) {
        this.logger.warn(`User not found with id: ${id}`);
        return Result.fail(new Error('User not found'));
      }

      const user = userResult.value;
      return Result.ok(UserDto.fromDomain(user));
      
    } catch (error) {
      this.logger.error(`Error getting user: ${error.message}`);
      return Result.fail(error);
    }
  }
} 