import { Container, CosmosClient } from '@azure/cosmos';
import { Result } from '../types/result.type';
import { IEntity } from '../types/base.types';

export abstract class Repository<T extends IEntity> {
  protected readonly container: Container;

  constructor(
    protected readonly client: CosmosClient,
    protected readonly databaseName: string,
    protected readonly containerName: string
  ) {
    this.container = this.client
      .database(this.databaseName)
      .container(this.containerName);
  }

  protected abstract toDomain(raw: Record<string, unknown>): T;
  protected abstract toRepository(entity: T): Record<string, unknown>;

  async findById(id: string): Promise<Result<T | null>> {
    try {
      const { resource } = await this.container.item(id, id).read();
      return Result.ok(resource ? this.toDomain(resource) : null);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async create(entity: T): Promise<Result<T>> {
    try {
      const document = this.toRepository(entity);
      console.log('document', document);
      const { resource } = await this.container.items.create(document);
      console.log('resource', resource);
      return Result.ok(this.toDomain(resource));
    } catch (error) {
      console.log('error', error);
      return Result.fail(error as Error);
    }
  }
} 