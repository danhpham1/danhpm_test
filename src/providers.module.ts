import { DatabaseModule } from '@frameworks/database/database.module';
import { Global, Module } from '@nestjs/common';
import { CATEGORIES_REPOSITORY, TYPE_REPOSITORY } from './constants';
import { CategoriesRepository } from '@frameworks/database/repositories/categories.repository';
import { TypeRepository } from '@frameworks/database/repositories/type.repository';
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
    {
      provide: TYPE_REPOSITORY,
      useExisting: TypeRepository
    }
  ],
  exports: [CATEGORIES_REPOSITORY, TYPE_REPOSITORY],
})
export class ProvidersModule {}
