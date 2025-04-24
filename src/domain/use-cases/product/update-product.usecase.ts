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
import { IBodyUpdateProductUseCase } from './product.interface';
import { IProductRepository } from '@/domain/repositories/product-repository.interface';
import { UnitOfWork } from '@/frameworks/database/unit-of-work.service';

@Injectable()
export class UpdateProductUseCase implements BaseUseCase {
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
  async execute(body: IBodyUpdateProductUseCase, id: string): Promise<IProduct> {
    if (!id) throw new NotFoundException('Not found id product');

    const product = await this.productRepository.findById(id);
    const dataUpdate = {};

    if (!product) throw new NotFoundException('Not found product');

    if (body.categoryID && (body.categoryID !== product?.category?.id)) {
      const category = await this.categoryRepository.findById(body.categoryID);

      if (!category) {
        throw new NotFoundException('Not found category');
      }

      dataUpdate['categoryID'] = category.id;
    }

    if (body.typeID && (body.typeID !== product?.type?.id)) {
      const type = await this.typeRepository.findById(body.typeID);

      if (!type) {
        throw new NotFoundException('Not found type');
      }

      dataUpdate['typeID'] = type.id;
    }

    try {
      //Init trans
      this.unitOfWork.startTransaction();
      const queryRunner = this.unitOfWork.getQueryRunner();

      // Update product
      await this.productRepository.updateProduct({
        name: body.name,
        price: body.price
      }, id, queryRunner);

      // Update type product
      if (dataUpdate['typeID']) {
        await this.productTypeRepository.deleteProductType(product.id, queryRunner);
        await this.productTypeRepository.createProductType({
          productID: product.id,
          typeID: dataUpdate['typeID']
        }, queryRunner);
      }

      // Update category product
      if (dataUpdate['categoryID']) {
        await this.productCategoryRepository.deleteProductCategory(product.id, queryRunner);
        await this.productCategoryRepository.createProductCategory({
          productID: product.id,
          categoryID: dataUpdate['categoryID']
        }, queryRunner);
      }

      // COmmit trans
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
