import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductTypeEntity } from '../entities/product-type.entity';
import { IProductTypeRepository } from '@domain/repositories/product-type-repository.interface';
import { ICreateProductTypeBody, IProductType } from '@domain/interfaces/product-type.interface';

@Injectable()
export class ProductTypeRepository
  extends Repository<ProductTypeEntity>
  implements IProductTypeRepository
{
  constructor(dataSource: DataSource) {
    super(ProductTypeEntity, dataSource.createEntityManager());
  }
  createProductType(data: ICreateProductTypeBody): Promise<IProductType> {
    const entity = this.create({
      productID: data.productID,
      typeID: data.typeID,
      createdBy: 'admin',
    });

    return this.save(entity);
  }

  deleteProductType(productID: string): Promise<DeleteResult> {
    return this.delete({
      productID: productID,
    });
  }
}
