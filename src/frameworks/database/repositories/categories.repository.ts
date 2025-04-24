import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';
import { ICategoriesRepository } from '@/domain/repositories/categories-repository.intefaces';
import { ICategories } from '@/domain/interfaces/category/categories.interfact';

@Injectable()
export class CategoriesRepository
  extends Repository<CategoriesEntity>
  implements ICategoriesRepository
{
  constructor(dataSource: DataSource) {
    super(CategoriesEntity, dataSource.createEntityManager());
  }

  findByIDs(ids: string[]): Promise<Array<ICategories>> {
    return this.findBy({ id: In(ids || []) });
  }

  findAll(): Promise<ICategories[]> {
    return this.find();
  }
  findById(id: string): Promise<ICategories> {
    return this.findOneBy({ id });
  }
}
