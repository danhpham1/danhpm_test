import { Module } from '@nestjs/common';
import { UseCasesModule } from '@domain/use-cases/use-cases.module';
import { CategoriesController } from './categories/categories.controller';
import { TypeController } from './types/type.controller';
import { ProductController } from './products/products.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [CategoriesController, TypeController, ProductController],
})
export class ControllersModule {}
