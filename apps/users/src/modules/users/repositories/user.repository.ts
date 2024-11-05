import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Repository } from '@app/core/base/repository.base';
import { User } from '../entities/user.entity';
import { CosmosClient, Container, Database } from '@azure/cosmos';
import { ConfigService } from '@nestjs/config';
import { Result } from '@app/core/types/result.type';

@Injectable()
export class UserRepository implements OnModuleInit {
  private readonly logger = new Logger(UserRepository.name);
  private container: Container;
  private database: Database;

  constructor(
    private readonly client: CosmosClient,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const databaseId = this.configService.get<string>('COSMOS_DATABASE');
    if (!databaseId) {
      throw new Error('COSMOS_DATABASE not configured');
    }

    try {
      this.logger.log('Initializing UserRepository...');
      this.database = this.client.database(databaseId);
      this.container = this.database.container('users');
      
      // Verify connection
      await this.container.items.readAll().fetchNext();
      this.logger.log('UserRepository initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize repository: ${error.message}`);
      throw error;
    }
  }

  async create(entity: User): Promise<Result<User>> {
    try {
      this.logger.log(`Creating user with id: ${entity.id}`);
      
      const document = this.toRepository(entity);
      const { resource } = await this.container.items.create(document);
      
      return Result.ok(this.toDomain(resource));
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      return Result.fail(error);
    }
  }

  private toDomain(raw: Record<string, unknown>): User {
    const userResult = User.create({
      id: raw.id as string,
      email: raw.email as string,
      name: raw.name as string,
      password: raw.password as string,
      createdAt: new Date(raw.createdAt as string),
      updatedAt: new Date(raw.updatedAt as string),
    });

    if (userResult.isFailure) {
      throw userResult.error;
    }

    return userResult.value;
  }

  private toRepository(entity: User): Record<string, unknown> {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      password: entity.getPassword(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      type: 'user',
    };
  }

  // add findById
  async findById(id: string): Promise<Result<User | null>> {
    const { resource } = await this.container.item(id, id).read();
    return resource ? Result.ok(this.toDomain(resource)) : Result.ok(null);
  }     
  // add findByEmail
  async findByEmail(email: string): Promise<User | null> {
    const query = {
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }]
    };
    const { resources } = await this.container.items.query(query).fetchNext();
    return resources.length > 0 ? this.toDomain(resources[0]) : null;
  }

  
  // add update

  // add delete
} 