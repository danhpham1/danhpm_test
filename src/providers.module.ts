import { DatabaseModule } from '@frameworks/database/database.module';
import { Global, Module } from '@nestjs/common';
import { CATEGORIES_REPOSITORY } from './constants';
import { CategoriesRepository } from '@frameworks/database/repositories/categories.repository';
@Global()
@Module({
  imports: [
    DatabaseModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'admin@123',
      database: 'test',
    }),
  ],
  providers: [
    {
      provide: CATEGORIES_REPOSITORY,
      useExisting: CategoriesRepository,
    },
  ],
  exports: [CATEGORIES_REPOSITORY],
})
export class ProvidersModule {}
