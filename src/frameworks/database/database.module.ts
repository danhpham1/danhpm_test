import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurableModuleClass } from './database.module-definition';
import { DatabaseModuleOptions } from './constants';
import { CategoriesRepository } from './repositories/categories.repository';
import { TypeRepository } from './repositories/type.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductTypeRepository } from './repositories/product-type.repository';
import { ProductCategoryRepository } from './repositories/product-category.repository';

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  public static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: options.type,
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: false,
          options: {
            encrypt: false,
          },
        }),
        TypeOrmModule.forFeature([CategoriesRepository, TypeRepository, ProductRepository, ProductTypeRepository, ProductCategoryRepository]),
      ],
      providers: [CategoriesRepository, TypeRepository, ProductRepository, ProductTypeRepository, ProductCategoryRepository],
      exports: [CategoriesRepository, TypeRepository, ProductRepository, ProductTypeRepository, ProductCategoryRepository],
    };
  }
}
