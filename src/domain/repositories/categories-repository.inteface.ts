import { ICategories } from '@domain/interfaces/categories.interfact';

export interface ICategoriesRepository {
  findAll(): Promise<Array<ICategories>>;
  findById(id: string): Promise<ICategories>;
}
