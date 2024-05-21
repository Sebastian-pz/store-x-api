import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested
} from 'class-validator';
import { GENDERS, SIZES } from './constants/product.constants';
import { ProductImage } from '../entities';
import { Type } from 'class-transformer';
import { ProductImageDto } from './productImage.dto';
import { ApiProperty } from '@nestjs/swagger';

// How do I want the body data of the petition to get to me?
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: [SIZES[0], SIZES[1]], enum: SIZES })
  @IsString({ each: true })
  @IsIn(SIZES, { each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({ enum: GENDERS })
  @IsIn(GENDERS)
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images?: ProductImage[];
}
