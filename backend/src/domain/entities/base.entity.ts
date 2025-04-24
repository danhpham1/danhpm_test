import { IBaseEntity } from './base-entity.interface';

export class BaseEntity implements IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: boolean;
  isActive: boolean;
  deletedBy: string;
  createdBy: string;
  updatedBy: string;
  fromDao<T>(this: T, dao: Partial<T>): T {
    return Object.assign(this, dao);
  }
}
