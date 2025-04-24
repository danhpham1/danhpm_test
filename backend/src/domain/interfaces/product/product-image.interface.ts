import { IBase } from '../base.interface';

export interface IProductImage extends IBase {
  productID: string;
  path: string;
  fileName: string;
}

export interface ICreateProductImageBody {
  productID: string;
  path: string;
  fileName: string;
}
