import { IBase } from "./base.interface";

export interface IProductType extends IBase{
  typeID: string;
  productID: string;
}


export interface ICreateProductTypeBody {
    typeID: string;
    productID: string;
  }