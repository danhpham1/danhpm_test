import { ICategories } from '../interfaces/categories.interfact';
import { BaseEntity } from './base.entity';

export class Category extends BaseEntity implements ICategories {
  id: string;
  name: string;
  parent_id?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: boolean;
  isActive: boolean;
  deletedBy: string;
  createdBy: string;
  updatedBy: string;
}
