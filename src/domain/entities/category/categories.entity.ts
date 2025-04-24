import { ICategories } from '../../interfaces/category/categories.interfact';
import { BaseEntity } from '../base.entity';

export class Category extends BaseEntity implements ICategories {
  name: string;
  parentId?: string;
}
