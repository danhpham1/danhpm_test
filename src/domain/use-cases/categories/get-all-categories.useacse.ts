import { Inject, Injectable } from '@nestjs/common';
import { CATEGORIES_REPOSITORY } from '@/constants';
import { ICategories } from '@/domain/interfaces/categories.interfact';
import { ICategoriesRepository } from '@/domain/repositories/categories-repository.inteface';
import { Category } from '@domain/entities/categories.interface';
import { BaseUseCase } from '../base-use-case.interface';

@Injectable()
export class GetAllCategoriesUseCase implements BaseUseCase {
  constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}
  async execute(): Promise<ICategories[]> {
    const categoriesData = await this.categoriesRepository.findAll();

    return categoriesData.map((category) => new Category().fromDao(category));
  }
}
