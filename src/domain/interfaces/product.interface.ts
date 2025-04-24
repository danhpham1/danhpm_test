import { IBase } from "./base.interface";

export interface IProduct extends IBase {
    name: string;
    price: number;
    isActive: boolean;
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
}