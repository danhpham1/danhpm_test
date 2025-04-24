import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { IProductImageRepository } from '@domain/repositories/product-image-repository.interface';
import { ProductImageEntity } from '../entities/product-image.entity';
import {
  ICreateProductImageBody,
  IProductImage,
} from '@/domain/interfaces/product/product-image.interface';

@Injectable()
export class ProductImageRepository
  extends Repository<ProductImageEntity>
  implements IProductImageRepository
{
  constructor(dataSource: DataSource) {
    super(ProductImageEntity, dataSource.createEntityManager());
  }

  createProductImage(
    data: ICreateProductImageBody,
    queryRunner?: QueryRunner,
  ): Promise<IProductImage> {
    const entity = this.create({
      path: data.path,
      productID: data.productID,
      fileName: data.fileName,
      createdBy: 'admin',
    });

    if (queryRunner) {
      return queryRunner.manager.save(ProductImageEntity, entity);
    }

    return this.save(entity);
  }

  deleteProductImage(
    productID: string,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(
        ProductImageEntity,
        {
          productID,
        },
        {
          deletedAt: new Date(),
          isDeleted: true,
          deletedBy: 'admin',
          updatedBy: 'admin',
        },
      );
    }
    return this.update(
      {
        productID,
      },
      {
        deletedAt: new Date(),
        isDeleted: true,
        deletedBy: 'admin',
        updatedBy: 'admin',
      },
    );
  }
}
