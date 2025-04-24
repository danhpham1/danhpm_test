import { IType } from '../interfaces/type/types.interfact';

export interface ITypeRepository {
  findAll(): Promise<Array<IType>>;
  findById(id: string): Promise<IType>;
  findByIDs(ids: string[]): Promise<Array<IType>>;
}
