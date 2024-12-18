export class InvalidCredentialsException extends Error {
  constructor(message: string = 'Invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsException';
  }
}
