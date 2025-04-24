import { IBase } from '../base.interface';

export interface ICategories extends Partial<IBase> {
  name: string;
  parent_id?: string;
  isActive: boolean;
}
