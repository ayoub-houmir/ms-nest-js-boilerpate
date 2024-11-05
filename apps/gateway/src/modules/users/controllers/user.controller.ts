import { Controller, Post, Body, Inject, UsePipes, ValidationPipe, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { Result } from '@app/core';
import { CreateUserRequest } from '../dtos/requests/create-user.request';
import { CreateUserResponse } from '../dtos/responses/create-user.response';
import { UserCommands } from '../interfaces/user-commands.interface';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

  
  async onModuleInit() {
    await this.userClient.connect();
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully created',
    type: CreateUserResponse 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  // @UsePipes(new ValidationPipe({ transform: true }))
 
  async createUser(
    @Body() request: CreateUserRequest
  ): Promise<Result<CreateUserResponse>> {
    try {
      return await firstValueFrom(
        this.userClient.send<Result<CreateUserResponse>>(
          UserCommands.CREATE_USER,
          request
        )
      );
    } catch (error) {
      // You might want to handle specific errors differently
      console.error('Error creating user', error);
      return Result.fail(error);
    }
  }
} 