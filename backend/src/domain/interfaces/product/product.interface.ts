import { IBase } from '../base.interface';

export interface IProduct extends IBase {
  name: string;
  price: number;
  isActive: boolean;
  category?: {
    id: string;
    name: string;
  };
  type?: {
    id: string;
    name: string;
  };
  productCategory?: {
    id: string;
    productID: string;
    categoryID: string;
  };
  productType?: {
    id: string;
    productID: string;
    typeID: string;
  };
  productImage?: {
    id: string;
    productID: string;
    fileName: string;
    path: string;
  };
}

export interface ICreateProductBody {
  name: string;
  price: number;
}

export interface IUpdateProductBody {
  name?: string;
  price?: number;
}
export interface IQueryParamProduct {
  name?: string;
  typeID?: string;
  categoryID?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}
