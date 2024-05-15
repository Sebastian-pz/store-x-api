import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';

@Injectable()
export default class ErrorHandler {
  logger: Logger;

  handle(origin: string, error: any) {
    this.setLogger(origin);
    this.log(error);

    if (error.code === '23505')
      throw new BadRequestException(`Duplicated keys: ${error.detail}`);

    if (error.status == 404)
      throw new NotFoundException(error.response.message);

    if (error.status == 400)
      throw new BadRequestException(error.response.message);

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
