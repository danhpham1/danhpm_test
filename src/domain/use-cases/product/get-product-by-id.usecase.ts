import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '@/constants';
import { BaseUseCase } from '../base-use-case.interface';
import { IProductRepository } from '@/domain/repositories/product-repository.interface';
import { IProduct } from '@domain/interfaces/product/product.interface';

@Injectable()
export class GetProductByIDUseCase implements BaseUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}
  async execute(id: string): Promise<IProduct> {
    const productData = await this.productRepository.findById(id);

    return productData;
  }
}
