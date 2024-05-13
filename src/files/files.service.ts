import { join } from 'path';
import { existsSync } from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticProductImages(imageName: string) {
    const path = join(__dirname, '../../static/images', imageName);
    if (!existsSync(path)) throw new BadRequestException('Image not found');

    return path;
  }
}
