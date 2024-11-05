import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
} 