import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { GENDERS, SIZES } from './constants/product.constants';

// How do I want the body data of the petition to get to me?
export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsString({ each: true })
  @IsIn(SIZES, { each: true })
  @IsArray()
  sizes: string[];

  @IsIn(GENDERS)
  gender: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
