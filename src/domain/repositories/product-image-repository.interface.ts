import { QueryRunner, UpdateResult } from 'typeorm';

import {
  ICreateProductImageBody,
  IProductImage,
} from '../interfaces/product/product-image.interface';

export interface IProductImageRepository {
  createProductImage(
    data: ICreateProductImageBody,
    queryRunner?: QueryRunner,
  ): Promise<IProductImage>;
  deleteProductImage(
    productID: string,
    queryRunner?: QueryRunner,
  ): Promise<UpdateResult>;
}
