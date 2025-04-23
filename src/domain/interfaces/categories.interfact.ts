export interface ICategories {
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
