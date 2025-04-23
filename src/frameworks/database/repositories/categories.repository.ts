import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';
import { ICategoriesRepository } from '@/domain/repositories/categories-repository.inteface';
import { ICategories } from '@/domain/interfaces/categories.interfact';

@Injectable()
export class CategoriesRepository
  extends Repository<CategoriesEntity>
  implements ICategoriesRepository
{
  constructor(dataSource: DataSource) {
    super(CategoriesEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<ICategories[]> {
    return this.find();
  }
  findById(id: string): Promise<ICategories> {
    return this.findOneBy({ id });
  }
}
