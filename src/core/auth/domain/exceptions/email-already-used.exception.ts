export class EmailAlreadyUsedException extends Error {
  constructor() {
    super('Email already in use');
    this.name = 'EmailAlreadyUsedException';
  }
}
