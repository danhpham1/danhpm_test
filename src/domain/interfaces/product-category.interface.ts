import { IBase } from './base.interface';

export interface IProductCategory extends IBase {
  categoryID: string;
  productID: string;
}

export interface ICreateProductCategoryBody {
  categoryID: string;
  productID: string;
}
