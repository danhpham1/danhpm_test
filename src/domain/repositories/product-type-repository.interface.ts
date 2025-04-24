import { QueryRunner, UpdateResult } from 'typeorm';
import { ICreateProductTypeBody, IProductType } from '../interfaces/product-type.interface';

export interface IProductTypeRepository {
    createProductType(data: ICreateProductTypeBody, queryRunner?: QueryRunner): Promise<IProductType>;
    deleteProductType(productID: string, queryRunner?: QueryRunner): Promise<UpdateResult>;
}
