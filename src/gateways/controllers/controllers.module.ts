import { Module } from '@nestjs/common';
import { UseCasesModule } from '@domain/use-cases/use-cases.module';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [CategoriesController],
})
export class ControllersModule {}
