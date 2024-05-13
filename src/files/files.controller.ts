import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // When you want to upload files POST is standard
  @Post('product-image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: {
        fieldSize: 1000
      },
      storage: diskStorage({
        destination: './static/images',
        filename: fileNamer
      })
    })
  ) // -> Using interceptor
  uploadProductImage(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    if (!file) throw new BadRequestException('Make sure you sent an image');

    return file;
  }
}
