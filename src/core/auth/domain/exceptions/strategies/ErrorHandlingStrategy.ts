export interface ErrorHandlingStrategy {
  handle(error: Error): never;
}
