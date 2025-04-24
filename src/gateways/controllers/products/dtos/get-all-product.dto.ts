import { IsOptional } from 'class-validator';

export class GetAllProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  categoryID?: string;

  @IsOptional()
  typeID?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  page: number = 1;

  @IsOptional()
  size: number = 10;
}
