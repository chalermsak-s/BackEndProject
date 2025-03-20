// Base service class that provides error handling functionality for all services
export abstract class BaseService {
  protected handleError(error: any, errorMessage: string): never {
    console.error(`${errorMessage}:`, error);
    throw error instanceof Error ? error : new Error(errorMessage);
  }
}