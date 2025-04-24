import { Inject, Injectable } from '@nestjs/common';
import { TYPE_REPOSITORY } from '@/constants';
import { ICategories } from '@/domain/interfaces/category/categories.interfact';
import { BaseUseCase } from '../base-use-case.interface';
import { ITypeRepository } from '@domain/repositories/type-repository.interface';
import { Type } from '@domain/entities/type/types.entity';

@Injectable()
export class GetAllTypesUseCase implements BaseUseCase {
  constructor(
    @Inject(TYPE_REPOSITORY)
    private readonly typeRepository: ITypeRepository,
  ) {}
  async execute(): Promise<ICategories[]> {
    const typesData = await this.typeRepository.findAll();

    return typesData.map((type) => new Type().fromDao(type));
  }
}
