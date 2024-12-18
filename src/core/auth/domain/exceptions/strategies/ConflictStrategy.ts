import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorHandlingStrategy } from './ErrorHandlingStrategy';

export class ConflictStrategy implements ErrorHandlingStrategy {
  handle(error: Error): never {
    throw new HttpException({
      status: HttpStatus.CONFLICT,
      error: error.message
    }, HttpStatus.CONFLICT);
  }
}
