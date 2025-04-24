import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IProductRepository } from '@domain/repositories/product-repository.interface';
import { ICreateProductBody, IProduct } from '@domain/interfaces/product.interface';

@Injectable()
export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
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

  createProduct(data?: ICreateProductBody): Promise<IProduct> {
    const productEntity = this.create({
        name: data.name,
        price: data.price,
        createdBy: 'admin'
      });
      
    return this.save(productEntity);
  }

  updateProduct(body: ICreateProductBody, id: string): Promise<UpdateResult> {
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

  deleteProduct(id: string): Promise<UpdateResult> {
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
