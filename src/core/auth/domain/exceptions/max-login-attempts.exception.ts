export class MaxLoginAttemptsException extends Error {
  constructor(remainingMinutes: number) {
    super(`Maximum login attempts exceeded. Please try again in ${remainingMinutes} minutes.`);
    this.name = 'MaxLoginAttemptsException';
  }
}
