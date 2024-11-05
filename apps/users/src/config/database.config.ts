import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('DatabaseConfig');

export interface DatabaseConfig {
  endpoint: string;
  key: string;
  database: string;
}

export const databaseConfig = registerAs('database', (): DatabaseConfig => {
  logger.log('Loading database configuration...');
  
  const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    database: process.env.COSMOS_DATABASE,
  };

  // Log configuration (without sensitive data)
  logger.log(`Database endpoint: ${config.endpoint}`);
  logger.log(`Database name: ${config.database}`);

  if (!config.endpoint || !config.key || !config.database) {
    logger.error('Missing required database configuration');
    throw new Error(
      'Missing required environment variables. Please check COSMOS_ENDPOINT, COSMOS_KEY, and COSMOS_DATABASE'
    );
  }

  return config;
}); 