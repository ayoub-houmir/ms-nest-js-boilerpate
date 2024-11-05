import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CosmosClient } from '@azure/cosmos';
import { Logger } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CosmosClient,
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        
        const endpoint = configService.get<string>('COSMOS_ENDPOINT');
        const key = configService.get<string>('COSMOS_KEY');
        const databaseId = configService.get<string>('COSMOS_DATABASE');

        console.log(endpoint, key, databaseId);
        if (!endpoint || !key || !databaseId) {
          throw new Error('Missing Cosmos DB configuration');
        }

        logger.log('Initializing Cosmos DB client...');

        const client = new CosmosClient({ 
          endpoint, 
          key,
        });

        try {
          // Create database if it doesn't exist
          logger.log(`Ensuring database ${databaseId} exists...`);
          const { database } = await client.databases.createIfNotExists({
            id: databaseId
          });

          // Create container if it doesn't exist
          logger.log('Ensuring users container exists...');
          await database.containers.createIfNotExists({
            id: 'users',
            partitionKey: '/id'
          });

          logger.log('Database initialization completed successfully');
          return client;
          
        } catch (error) {
          logger.error(`Failed to initialize database: ${error.message}`);
          throw error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [CosmosClient],
})
export class DatabaseModule {} 