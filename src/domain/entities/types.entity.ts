import { IType } from '../interfaces/types.interfact';
import { BaseEntity } from './base.entity';

export class Type extends BaseEntity implements IType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: boolean;
  isActive: boolean;
  deletedBy: string;
  createdBy: string;
  updatedBy: string;
}
