import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IProductRepository } from '@domain/repositories/product-repository.interface';
import { ICreateProductBody, IProduct } from '@domain/interfaces/product.interface';

@Injectable()
export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<IProduct[]> {
    return this.find();
  }

  findById(id: string): Promise<IProduct> {
    return this.findOne({
      where: {
        id
      },
      relations: ['category', 'type']
    });
  }

  createProduct(data?: ICreateProductBody, queryRunner?: QueryRunner): Promise<IProduct> {
    const productEntity = this.create({
      name: data.name,
      price: data.price,
      createdBy: 'admin'
    });

    if (queryRunner) {
      return queryRunner.manager.save(ProductEntity, productEntity);
    }

    return this.save(productEntity);
  }

  updateProduct(body: ICreateProductBody, id: string, queryRunner?: QueryRunner): Promise<UpdateResult> {

    if (queryRunner) {
      return queryRunner.manager.update(ProductEntity, {
        id
      },
        {
          ...body,
          updatedAt: new Date(),
          updatedBy: 'admin'
        })
    }

    return this.update(
      {
        id
      },
      {
        ...body,
        updatedAt: new Date(),
        updatedBy: 'admin'
      }
    )
  }

  deleteProduct(id: string, queryRunner?: QueryRunner): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(ProductEntity, {
        id
      },
        {
          deletedAt: new Date(),
          deletedBy: 'admin',
          isDeleted: true,
          updatedAt: new Date()
        });
    }
    return this.update(
      {
        id
      },
      {
        deletedAt: new Date(),
        deletedBy: 'admin',
        isDeleted: true,
        updatedAt: new Date()
      }
    )
  }
}
