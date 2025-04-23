import { Module } from '@nestjs/common';

import { GetAllCategoriesUseCase } from './categories/get-all-categories.useacse';

const useCases = [GetAllCategoriesUseCase];

@Module({
  imports: [],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
