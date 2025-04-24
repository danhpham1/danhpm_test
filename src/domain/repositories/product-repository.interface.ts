import { ICreateProductBody, IProduct, IQueryParamProduct } from '@domain/interfaces/product.interface';
import { UpdateResult } from 'typeorm';

export interface IProductRepository {
//   findAll(): Promise<Array<ICategories>>;
//   findById(id: string): Promise<ICategories>;
    createProduct(data: ICreateProductBody): Promise<IProduct>;
    updateProduct(body: ICreateProductBody, id: string): Promise<UpdateResult>;
    deleteProduct(id: string): Promise<UpdateResult>;
    findAll(params: IQueryParamProduct): Promise<Array<IProduct>>;
}
