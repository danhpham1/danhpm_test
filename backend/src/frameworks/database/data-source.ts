import { DataSource } from 'typeorm';
import databaseConfig from '@frameworks/database/database-config';
export const AppDataSource = new DataSource(databaseConfig);
