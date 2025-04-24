import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllTypesUseCase } from '@domain/use-cases/type/get-all-types.usecase';
import { TypeDto } from './dtos/type.dto';

@Controller('types')
export class TypeController {
  constructor(
    private readonly getAllTypesUseCase: GetAllTypesUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: Array<TypeDto> })
  findAll() {
    return this.getAllTypesUseCase.execute();
  }
}
