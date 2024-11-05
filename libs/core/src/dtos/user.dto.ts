import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { Transform, Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  @IsEmail({}, { message: 'Invalid email format' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Expose()
  @IsOptional()
  id?: string;

  @Expose()
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @IsOptional()
  updatedAt?: Date;
} 