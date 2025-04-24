import { QueryRunner, UpdateResult } from 'typeorm';
import { ICreateProductCategoryBody, IProductCategory } from '../interfaces/product-category.interface';

export interface IProductCategoryRepository {
    createProductCategory(data: ICreateProductCategoryBody, queryRunner?: QueryRunner): Promise<IProductCategory>;
    deleteProductCategory(productID: string, queryRunner?: QueryRunner): Promise<UpdateResult>;
}
