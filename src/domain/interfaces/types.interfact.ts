export interface IType {
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
