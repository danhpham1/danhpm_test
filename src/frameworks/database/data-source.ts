import { DataSource } from 'typeorm';
import databaseConfig from '@frameworks/database/database-config';
console.log('Database config:', databaseConfig);
export const AppDataSource = new DataSource(databaseConfig);
