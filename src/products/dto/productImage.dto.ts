import { IsString } from 'class-validator';

export class ProductImageDto {
  @IsString()
  title: string;

  @IsString() // or @IsUrl()
  url: string;
}
