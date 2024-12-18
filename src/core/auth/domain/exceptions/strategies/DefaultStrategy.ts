import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorHandlingStrategy } from './ErrorHandlingStrategy';

export class DefaultStrategy implements ErrorHandlingStrategy {
  handle(error: Error): never {
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `An unexpected error occurred: ${error.message}`,
      details: error.constructor.name
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
