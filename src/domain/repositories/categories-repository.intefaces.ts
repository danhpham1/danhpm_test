import { ICategories } from '@domain/interfaces/category/categories.interfact';

export interface ICategoriesRepository {
  findAll(): Promise<Array<ICategories>>;
  findById(id: string): Promise<ICategories>;
  findByIDs(ids: string[]): Promise<Array<ICategories>>;
}
