import { IType } from '../interfaces/types.interfact';

export interface ITypeRepository {
  findAll(): Promise<Array<IType>>;
  findById(id: string): Promise<IType>;
}
