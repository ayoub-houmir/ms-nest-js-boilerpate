import { IEntity } from '../types/base.types';
import { Result } from '../types/result.type';

export abstract class BaseDto<T extends IEntity> {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  abstract toDomain(): Result<T>;
  // abstract fromDomain(entity: any): T;
  // static fromDomain<D extends BaseDto<any>>(this: new () => D, entity: IEntity): D {
  //   const dto = new this();
  //   dto.id = entity.id;
  //   dto.createdAt = entity.createdAt;
  //   dto.updatedAt = entity.updatedAt;
  //   return dto;
  // }
} 