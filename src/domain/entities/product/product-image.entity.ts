import { IProductImage } from '../../interfaces/product/product-image.interface';
import { BaseEntity } from '../base.entity';

export class ProductImage extends BaseEntity implements IProductImage {
  path: string;
  fileName: string;
  productID: string;
}
