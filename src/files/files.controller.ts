import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // When you want to upload files POST is standard
  @Post('product-image')
  @UseInterceptors(FileInterceptor('file')) // -> Using interceptor
  uploadProductImage(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return file;
  }
}
