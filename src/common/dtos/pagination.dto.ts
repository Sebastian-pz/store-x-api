import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number) // Parse datatypes
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  offset?: number;
}
