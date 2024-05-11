import { Module } from '@nestjs/common';
import ErrorHandler from './handler/error.handler';

@Module({
  providers: [ErrorHandler],
  exports: [ErrorHandler]
})
export class CommonModule {}
