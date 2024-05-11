import {
  BadRequestException,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';

export default class ErrorHandler {
  logger: Logger;
  constructor(errorFunction: string) {
    this.logger = new Logger(errorFunction);
  }

  handle(error: any) {
    this.log(error);

    if (error.code === '23505')
      throw new BadRequestException(`Duplicated keys: ${error.detail}`);

    throw new InternalServerErrorException();
  }

  log(error: any) {
    // Server logs
    this.logger.error(error);
  }
}
