export interface IBase {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
    deletedBy: string;
    createdBy: string;
    updatedBy: string;
}