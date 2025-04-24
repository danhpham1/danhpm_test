import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_TYPE_REPOSITORY,
  UNIT_OF_WORK_SERVICE,
} from '@/constants';
import { BaseUseCase } from '../base-use-case.interface';
import { IProductCategoryRepository } from '@/domain/repositories/product-category-repository.interface';
import { IProductTypeRepository } from '@/domain/repositories/product-type-repository.interface';
import { IProduct } from '@domain/interfaces/product/product.interface';
import { IProductRepository } from '@/domain/repositories/product-repository.interface';
import { UnitOfWork } from '@/frameworks/database/unit-of-work.service';

@Injectable()
export class DeleteProductUseCase implements BaseUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly productCategoryRepository: IProductCategoryRepository,
    @Inject(UNIT_OF_WORK_SERVICE)
    private readonly unitOfWork: UnitOfWork,
  ) {}
  async execute(id: string): Promise<IProduct> {
    if (!id) throw new NotFoundException('Not found id product');

    const product = await this.productRepository.findById(id);

    if (!product) throw new NotFoundException('Not found product');

    try {
      //Init trans
      await this.unitOfWork.startTransaction();
      const queryRunner = this.unitOfWork.getQueryRunner();

      // Delete soft
      await Promise.all([
        this.productCategoryRepository.deleteProductCategory(id, queryRunner),
        this.productTypeRepository.deleteProductType(id, queryRunner),
        this.productRepository.deleteProduct(id, queryRunner),
      ]);

      // Commit trans
      await this.unitOfWork.commitTransaction();

      return product;
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
