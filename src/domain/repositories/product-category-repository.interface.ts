import { UpdateResult } from 'typeorm';
import { ICreateProductCategoryBody, IProductCategory } from '../interfaces/product-category.interface';

export interface IProductCategoryRepository {
    createProductCategory(data: ICreateProductCategoryBody): Promise<IProductCategory>;
    deleteProductCategory(productID: string): Promise<UpdateResult>;
}
