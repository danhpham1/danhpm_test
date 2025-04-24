import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORIES_REPOSITORY,
  PRODUCT_CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_TYPE_REPOSITORY,
  TYPE_REPOSITORY,
  UNIT_OF_WORK_SERVICE,
} from '@/constants';
import { BaseUseCase } from '../base-use-case.interface';
import { ITypeRepository } from '@domain/repositories/type-repository.interface';
import { ICategoriesRepository } from '@domain/repositories/categories-repository.intefaces';
import { IProductCategoryRepository } from '@/domain/repositories/product-category-repository.interface';
import { IProductTypeRepository } from '@/domain/repositories/product-type-repository.interface';
import { IProduct } from '@domain/interfaces/product.interface';
import { IBodyCreateProductUseCase } from './product.interface';
import { IProductRepository } from '@/domain/repositories/product-repository.interface';
import { UnitOfWork } from '@/frameworks/database/unit-of-work.service';

@Injectable()
export class CreateProductUseCase implements BaseUseCase {
  constructor(
    @Inject(TYPE_REPOSITORY)
    private readonly typeRepository: ITypeRepository,
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoryRepository: ICategoriesRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly productCategoryRepository: IProductCategoryRepository,
    @Inject(UNIT_OF_WORK_SERVICE)
    private readonly unitOfWork: UnitOfWork,
  ) { }
  async execute(body: IBodyCreateProductUseCase): Promise<IProduct> {
    try {
      if (body.categoryID) {
        const category = await this.categoryRepository.findById(body.categoryID);

        if (!category) {
          throw new NotFoundException('Not found category');
        }
      }

      if (body.typeID) {
        const type = await this.typeRepository.findById(body.typeID);

        if (!type) {
          throw new NotFoundException('Not found type');
        }
      }

      // Init trans
      const queryRunner = this.unitOfWork.getQueryRunner();
      await this.unitOfWork.startTransaction();

      // Create product
      const product = await this.productRepository.createProduct({
        name: body.name,
        price: body.price,
      }, queryRunner);

      if (product) {
        if (body.categoryID) {
          await this.productCategoryRepository.createProductCategory({
            productID: product.id,
            categoryID: body.categoryID
          }, queryRunner);
        }

        if (body.typeID) {
          await this.productTypeRepository.createProductType({
            productID: product.id,
            typeID: body.typeID
          }, queryRunner)
        }
      }

      await this.unitOfWork.commitTransaction();

      return product;
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    } finally {
      await this.unitOfWork.release();
    }
  }
}
