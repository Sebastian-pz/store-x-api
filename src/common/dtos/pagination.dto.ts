import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 10 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number) // Parse datatypes
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  offset?: number;
}
