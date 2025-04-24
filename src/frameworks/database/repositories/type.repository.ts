import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TypeEntity } from '../entities/type.entity';
import { IType } from '@domain/interfaces/types.interfact';
import { ITypeRepository } from '@domain/repositories/type-repository.interface';

@Injectable()
export class TypeRepository
  extends Repository<TypeEntity>
  implements ITypeRepository
{
  constructor(dataSource: DataSource) {
    super(TypeEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<IType[]> {
    return this.find();
  }

  findById(id: string): Promise<IType> {
    return this.findOneBy({ id });
  }
}
