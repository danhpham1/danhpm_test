import { ICategories } from '../interfaces/categories.interfact';
import { BaseEntity } from './base.entity';

export class Category extends BaseEntity implements ICategories {
  name: string;
  parentId?: string;
}
