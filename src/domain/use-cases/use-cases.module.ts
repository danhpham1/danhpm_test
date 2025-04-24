import { Module } from '@nestjs/common';

import { GetAllCategoriesUseCase } from './categories/get-all-categories.useacse';
import { GetAllTypesUseCase } from './type/get-all-types.usecase';

const useCases = [GetAllCategoriesUseCase, GetAllTypesUseCase];

@Module({
  imports: [],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
