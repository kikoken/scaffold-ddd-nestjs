import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorHandlingStrategy } from './ErrorHandlingStrategy';

export class InvalidCredentialsStrategy implements ErrorHandlingStrategy {
  handle(error: Error): never {
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: error.message
    }, HttpStatus.UNAUTHORIZED);
  }
}
