import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateProductUseCase } from '@domain/use-cases/product/create-product.usecase';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { UpdateProductUseCase } from '@domain/use-cases/product/update-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase
  ) {}

  @Post()
  create(@Body() body: CreateProductDTO) {
    return this.createProductUseCase.execute(body);
  }

  @Patch(':id')
  update(@Body() body: UpdateProductDTO, @Param('id') id: string) {
    return this.updateProductUseCase.execute(body, id);
  }
}
