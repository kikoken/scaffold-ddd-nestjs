import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorHandlingStrategy } from './ErrorHandlingStrategy';

export class UserNotFoundStrategy implements ErrorHandlingStrategy {
  handle(error: Error): never {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: error.message
    }, HttpStatus.NOT_FOUND);
  }
}
