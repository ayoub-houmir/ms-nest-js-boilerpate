import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly createdAt: Date;
} 