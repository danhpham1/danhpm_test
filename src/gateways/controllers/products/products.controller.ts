import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductUseCase } from '@domain/use-cases/product/create-product.usecase';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { UpdateProductUseCase } from '@domain/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from '@domain/use-cases/product/delete-product.usecase';
import { GetAllProductDto } from './dtos/get-all-product.dto';
import { GetAllProductsUseCase } from '@domain/use-cases/product/get-all-product.usecase';
import { GetProductByIDUseCase } from '@/domain/use-cases/product/get-product-by-id.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getAllProductUseCase: GetAllProductsUseCase,
    private readonly getProductByIDUseCase: GetProductByIDUseCase,
  ) {}

  @Get()
  findAll(@Query() query: GetAllProductDto) {
    return this.getAllProductUseCase.execute(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getProductByIDUseCase.execute(id);
  }

  @Post()
  create(@Body() body: CreateProductDTO) {
    return this.createProductUseCase.execute(body);
  }

  @Put(':id')
  update(@Body() body: UpdateProductDTO, @Param('id') id: string) {
    return this.updateProductUseCase.execute(body, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}
