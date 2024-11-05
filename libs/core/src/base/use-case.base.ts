import { Result } from '../types/result.type';

export interface IUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<Result<TResponse>>;
}

export abstract class UseCase<TRequest, TResponse> implements IUseCase<TRequest, TResponse> {
  abstract execute(request: TRequest): Promise<Result<TResponse>>;
} 