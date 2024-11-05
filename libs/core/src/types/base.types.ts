export interface IBaseProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  toJSON(): Record<string, unknown>;
} 