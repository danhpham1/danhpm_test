import {
  ICreateProductBody,
  IProduct,
  IQueryParamProduct,
} from '@domain/interfaces/product/product.interface';
import { QueryRunner, UpdateResult } from 'typeorm';

export interface IProductRepository {
  //   findAll(): Promise<Array<ICategories>>;
  //   findById(id: string): Promise<ICategories>;
  createProduct(
    data: ICreateProductBody,
    queryRunner?: QueryRunner,
  ): Promise<IProduct>;
  updateProduct(
    body: ICreateProductBody,
    id: string,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult>;
  deleteProduct(id: string, queryRunner?: QueryRunner): Promise<UpdateResult>;
  findAll(params: IQueryParamProduct): Promise<[Array<IProduct>, number]>;
  findById(id: string): Promise<IProduct>;
}
