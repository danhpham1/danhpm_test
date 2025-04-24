import { DatabaseModule } from '@frameworks/database/database.module';
import { Global, Module } from '@nestjs/common';
import { CATEGORIES_REPOSITORY, PRODUCT_CATEGORY_REPOSITORY, PRODUCT_REPOSITORY, PRODUCT_TYPE_REPOSITORY, TYPE_REPOSITORY, UNIT_OF_WORK_SERVICE } from './constants';
import { CategoriesRepository } from '@frameworks/database/repositories/categories.repository';
import { TypeRepository } from '@frameworks/database/repositories/type.repository';
import { ProductRepository } from '@frameworks/database/repositories/product.repository';
import { ProductTypeRepository } from './frameworks/database/repositories/product-type.repository';
import { ProductCategoryRepository } from './frameworks/database/repositories/product-category.repository';
import { UnitOfWork } from './frameworks/database/unit-of-work.service';
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
      useExisting: TypeRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useExisting: ProductRepository,
    },
    {
      provide: PRODUCT_TYPE_REPOSITORY,
      useExisting: ProductTypeRepository,
    },
    {
      provide: PRODUCT_CATEGORY_REPOSITORY,
      useExisting: ProductCategoryRepository,
    },
    {
      provide: UNIT_OF_WORK_SERVICE,
      useExisting: UnitOfWork
    }
  ],
  exports: [CATEGORIES_REPOSITORY, TYPE_REPOSITORY, PRODUCT_REPOSITORY, PRODUCT_CATEGORY_REPOSITORY, PRODUCT_TYPE_REPOSITORY, UNIT_OF_WORK_SERVICE],
})
export class ProvidersModule { }
