import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORIES_REPOSITORY,
  PRODUCT_REPOSITORY,
  TYPE_REPOSITORY,
} from '@/constants';
import { BaseUseCase } from '../base-use-case.interface';
import { IProductRepository } from '@domain/repositories/product-repository.interface';
import { IQueryParamProduct } from '@domain/interfaces/product/product.interface';
import { ICategoriesRepository } from '@domain/repositories/categories-repository.intefaces';
import { ITypeRepository } from '@domain/repositories/type-repository.interface';

@Injectable()
export class GetAllProductsUseCase implements BaseUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: ICategoriesRepository,
    @Inject(TYPE_REPOSITORY)
    private readonly typeRepository: ITypeRepository,
  ) {}
  async execute(
    queryParam: IQueryParamProduct,
  ): Promise<{ data: any[]; total: number; page: number; size: number }> {
    const [products, total] = await this.productRepository.findAll(queryParam);

    if (!products || products.length === 0) {
      return {
        data: [],
        total: 0,
        page: 0,
        size: 0,
      };
    }

    // check if productCategory is not null
    const categoryIDs = products
      ?.map((product) => product?.productCategory?.categoryID)
      ?.filter((categoryID) => categoryID);

    // check if categoryIDs is not null
    const categoryMap = new Map<string, string>();
    if (categoryIDs && categoryIDs.length > 0) {
      const categories = await this.categoriesRepository.findByIDs(categoryIDs);
      categories.forEach((category) => {
        categoryMap.set(category.id, category.name);
      });
    }

    // Check if productType is not null
    const typeIDs = products
      ?.map((product) => product?.productType?.typeID)
      ?.filter((typeID) => typeID);

    // check if typeIDs is not null
    const typeMap = new Map<string, string>();
    if (typeIDs && typeIDs.length > 0) {
      const types = await this.typeRepository.findByIDs(typeIDs);
      types.forEach((type) => {
        typeMap.set(type.id, type.name);
      });
    }
    // Map the product to include category and type names
    products.forEach((product) => {
      if (product?.productCategory) {
        product['categories'] = categoryMap.get(
          product.productCategory.categoryID,
        );
      }
      if (product?.productType) {
        product['types'] = typeMap.get(product.productType.typeID);
      }
    });
    // Return the products with category and type names

    return {
      data: products,
      total,
      page: queryParam.page || 1,
      size: queryParam.size || 10,
    };
  }
}
