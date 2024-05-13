import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // When you want to upload files POST is standard
  @Post('product-image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter
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
