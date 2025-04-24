import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { ProductTypeEntity } from '../entities/product-type.entity';
import { IProductTypeRepository } from '@domain/repositories/product-type-repository.interface';
import {
  ICreateProductTypeBody,
  IProductType,
} from '@domain/interfaces/product/product-type.interface';

@Injectable()
export class ProductTypeRepository
  extends Repository<ProductTypeEntity>
  implements IProductTypeRepository
{
  constructor(dataSource: DataSource) {
    super(ProductTypeEntity, dataSource.createEntityManager());
  }
  createProductType(
    data: ICreateProductTypeBody,
    queryRunner?: QueryRunner,
  ): Promise<IProductType> {
    const entity = this.create({
      productID: data.productID,
      typeID: data.typeID,
      createdBy: 'admin',
    });

    if (queryRunner) {
      return queryRunner.manager.save(ProductTypeEntity, entity);
    }

    return this.save(entity);
  }

  deleteProductType(
    productID: string,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(
        ProductTypeEntity,
        {
          productID: productID,
        },
        {
          deletedAt: new Date(),
          deletedBy: 'admin',
          isDeleted: true,
          updatedBy: 'admin',
        },
      );
    }
    return this.update(
      {
        productID: productID,
      },
      {
        deletedAt: new Date(),
        deletedBy: 'admin',
        isDeleted: true,
        updatedBy: 'admin',
      },
    );
  }
}
