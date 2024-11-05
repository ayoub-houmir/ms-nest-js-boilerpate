import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseDto } from '@app/core/base/dto.base';
import { User } from '../entities/user.entity';
import { Result } from '@app/core/types/result.type';
import { Exclude, Expose } from 'class-transformer';
import { IEntity } from '@app/core';

export class UserDto extends BaseDto<User> {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Exclude({ toPlainOnly: true })
  password?: string;

  toDomain(): Result<User> {
    console.log('toDomain');
    return User.create({
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    });
  }

  static fromDomain(entity: User): UserDto {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.name = entity.name;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }


  // static override fromDomain<D extends UserDto, T extends User>(this: new () => D, entity: T): D {
  //   return super.fromDomain(entity) as D; 
  // }
} 