import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    @IsOptional()
    categoryID?: string;

    @IsString()
    @IsOptional()
    typeID?: string;
  }
  