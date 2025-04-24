import { IProductType } from '../../interfaces/product/product-type.interface';
import { BaseEntity } from '../base.entity';

export class ProductType extends BaseEntity implements IProductType {
  typeID: string;
  productID: string;
}
