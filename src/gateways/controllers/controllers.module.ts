import { Module } from '@nestjs/common';
import { UseCasesModule } from '@domain/use-cases/use-cases.module';
import { CategoriesController } from './categories/categories.controller';
import { TypeController } from './types/type.controller';
import { ProductController } from './products/products.controller';
import { UploadController } from './upload/upload-file.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [
    CategoriesController,
    TypeController,
    ProductController,
    UploadController,
  ],
})
export class ControllersModule {}
