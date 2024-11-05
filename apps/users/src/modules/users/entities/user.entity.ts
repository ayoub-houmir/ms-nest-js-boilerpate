import { Entity } from '@app/core/base/entity.base';
import { IBaseProps } from '@app/core/types/base.types';
import { Result } from '@app/core/types/result.type';

interface UserProps extends IBaseProps {
  email: string;
  name: string;
  password?: string;
}

export class User extends Entity {
  readonly email: string;
  readonly name: string;
  private readonly password?: string;

  private constructor(props: UserProps) {
    super(props);
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
  }

  static create(props: UserProps): Result<User> {
    console.log('create', props);
    // Email validation
    if (!props.email) {
      return Result.fail(new Error('Email is required'));
    }
    if (!this.isValidEmail(props.email)) {
      return Result.fail(new Error('Invalid email format'));
    }

    // Name validation
    if (!props.name) {
      return Result.fail(new Error('Name is required'));
    }
    if (props.name.length < 2) {
      return Result.fail(new Error('Name must be at least 2 characters'));
    }

    // Password validation (if provided)
    if (props.password && props.password.length < 6) {
      return Result.fail(new Error('Password must be at least 6 characters'));
    }

    return Result.ok(new User(props));
  }

  // Getters
  getPassword(): string | undefined {
    return this.password;
  }


  // Serialization
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Validation helpers
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Equality comparison
  equals(entity: User): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (!(entity instanceof User)) {
      return false;
    }
    return this.id === entity.id;
  }
} 