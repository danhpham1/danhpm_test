import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllCategoriesUseCase } from '@/domain/use-cases/categories/get-all-categories.useacse';
import { CategoryDto } from './dtos/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: Array<CategoryDto> })
  findAll() {
    return this.getAllCategoriesUseCase.execute();
  }
}
