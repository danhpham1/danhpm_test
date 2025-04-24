import { Module } from '@nestjs/common';

import { GetAllCategoriesUseCase } from './categories/get-all-categories.useacse';
import { GetAllTypesUseCase } from './type/get-all-types.usecase';
import { CreateProductUseCase } from './product/create-product.usecase';
import { UpdateProductUseCase } from './product/update-product.usecase';
import { DeleteProductUseCase } from './product/delete-product.usecase';
import { GetAllProductsUseCase } from './product/get-all-product.usecase';
import { GetProductByIDUseCase } from './product/get-product-by-id.usecase';

const useCases = [
  GetAllCategoriesUseCase,
  GetAllTypesUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductByIDUseCase,
];

@Module({
  imports: [],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
