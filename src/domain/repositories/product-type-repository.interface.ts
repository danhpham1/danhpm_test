import { DeleteResult, UpdateResult } from 'typeorm';
import { ICreateProductTypeBody, IProductType } from '../interfaces/product-type.interface';

export interface IProductTypeRepository {
    createProductType(data: ICreateProductTypeBody): Promise<IProductType>;
    deleteProductType(productID: string): Promise<DeleteResult>;
}
