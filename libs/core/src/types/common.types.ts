export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface IBaseProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
} 