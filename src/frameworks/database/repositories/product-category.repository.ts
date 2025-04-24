import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { ProductCategoryEntity } from '../entities/product-category.entity';
import { IProductCategoryRepository } from '@/domain/repositories/product-category-repository.interface';
import { ICreateProductCategoryBody, IProductCategory } from '@/domain/interfaces/product-category.interface';

@Injectable()
export class ProductCategoryRepository
  extends Repository<ProductCategoryEntity>
  implements IProductCategoryRepository
{
  constructor(dataSource: DataSource) {
    super(ProductCategoryEntity, dataSource.createEntityManager());
  }

    createProductCategory(data: ICreateProductCategoryBody): Promise<IProductCategory> {
        const entity = this.create({
            categoryID: data.categoryID,
            productID: data.productID,
            createdBy: 'admin'
        });

        return this.save(entity);
    }

    deleteProductCategory(productID: string): Promise<UpdateResult> {
        return this.update(
            {
                productID: productID
            },
            {
               deletedAt: new Date(),
               deletedBy: 'admin',
               isDeleted: true 
            }
        )
    }

}
