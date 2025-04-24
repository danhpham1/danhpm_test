import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { ProductCategoryEntity } from '../entities/product-category.entity';
import { IProductCategoryRepository } from '@/domain/repositories/product-category-repository.interface';
import { ICreateProductCategoryBody, IProductCategory } from '@/domain/interfaces/product-category.interface';

@Injectable()
export class ProductCategoryRepository
  extends Repository<ProductCategoryEntity>
  implements IProductCategoryRepository {
  constructor(dataSource: DataSource) {
    super(ProductCategoryEntity, dataSource.createEntityManager());
  }

  createProductCategory(
    data: ICreateProductCategoryBody,
    queryRunner: QueryRunner
  ): Promise<IProductCategory> {
    const entity = this.create({
      categoryID: data.categoryID,
      productID: data.productID,
      createdBy: 'admin',
    });

    if (queryRunner) {
      return queryRunner.manager.save(ProductCategoryEntity, entity);
    }

    return this.save(entity);
  }

  deleteProductCategory(productID: string, queryRunner?: QueryRunner): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(ProductCategoryEntity,
        {
          productID
        },
        {
          deletedAt: new Date(),
          isDeleted: true,
          deletedBy: 'admin'
        }
      )
    }
    return this.update(
      {
        productID
      },
      {
        deletedAt: new Date(),
        isDeleted: true,
        deletedBy: 'admin'
      }
    );
  }
}
