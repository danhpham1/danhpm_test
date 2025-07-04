export interface IBodyCreateProductUseCase {
  name: string;
  price: number;
  categoryID?: string;
  typeID?: string;
  filePath?: string;
  fileName?: string;
}

export interface IBodyUpdateProductUseCase {
  name: string;
  price: number;
  categoryID?: string;
  typeID?: string;
  filePath?: string;
  fileName?: string;
}
