import { IsString } from 'class-validator';

export class ProductImageDto {
  @IsString()
  alt: string;

  @IsString() // or @IsUrl()
  url: string;
}
