import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'client@emial.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '*******' })
  @IsString()
  password: string;
}
