import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { TypeEntity } from '../entities/type.entity';
import { IType } from '@domain/interfaces/type/types.interfact';
import { ITypeRepository } from '@domain/repositories/type-repository.interface';

@Injectable()
export class TypeRepository
  extends Repository<TypeEntity>
  implements ITypeRepository
{
  constructor(dataSource: DataSource) {
    super(TypeEntity, dataSource.createEntityManager());
  }

  findByIDs(ids: string[]): Promise<Array<IType>> {
    return this.find({ where: { id: In(ids || []) } });
  }

  findAll(): Promise<IType[]> {
    return this.find();
  }

  findById(id: string): Promise<IType> {
    return this.findOneBy({ id });
  }
}
