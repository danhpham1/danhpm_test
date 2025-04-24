import { IProductCategory } from '../interfaces/product-category.interface';
import { BaseEntity } from './base.entity';

export class ProductCategory extends BaseEntity implements IProductCategory {
  categoryID: string;
  productID: string;
}
