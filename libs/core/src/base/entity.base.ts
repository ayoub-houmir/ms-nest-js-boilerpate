import { IBaseProps, IEntity } from '../types/base.types';

export abstract class Entity implements IEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: IBaseProps) {
    this.id = props.id || crypto.randomUUID();
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public equals(entity: Entity): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    return this.id === entity.id;
  }

  abstract toJSON(): Record<string, unknown>;
} 