import { Module } from '@nestjs/common';

import { GetAllCategoriesUseCase } from './categories/get-all-categories.useacse';
import { GetAllTypesUseCase } from './type/get-all-types.usecase';
import { CreateProductUseCase } from './product/create-product.usecase';
import { UpdateProductUseCase } from './product/update-product.usecase';

const useCases = [GetAllCategoriesUseCase, GetAllTypesUseCase, CreateProductUseCase, UpdateProductUseCase];

@Module({
  imports: [],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
