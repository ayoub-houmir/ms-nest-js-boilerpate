export class Result<T, E extends Error = Error> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {}

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get value(): T {
    if (!this._isSuccess) {
      throw new Error(`Can't get value from failed result. Error: ${this._error?.message}`);
    }
    return this._value as T;
  }

  get error(): E {
    if (this._isSuccess) {
      throw new Error(`Can't get error from successful result`);
    }
    return this._error as E;
  }

  public static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  public static fail<T, E extends Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  public static combine(results: Result<any>[]): Result<void> {
    for (const result of results) {
      if (result.isFailure) return Result.fail(result.error);
    }
    return Result.ok<void>(undefined);
  }
} 