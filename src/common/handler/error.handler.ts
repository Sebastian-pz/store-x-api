import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';

@Injectable()
export default class ErrorHandler {
  logger: Logger;

  handle(origin: string, error: any) {
    this.setLogger(origin);
    this.log(error);

    if (error.code === '23505')
      throw new BadRequestException(`Duplicated keys: ${error.detail}`);

    throw new InternalServerErrorException();
  }

  setLogger(name: string) {
    if (!this.logger) this.logger = new Logger(name);
  }

  log(error: any) {
    // Server logs
    this.logger.error(error);
  }
}
