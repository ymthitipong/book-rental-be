export interface ICounterRepository {
  getPublisherCounterNumber(): Promise<number | null>;
  updatePublisherCounterNumber(counterNumber: number): Promise<void>;
  getAuthorCounterNumber(): Promise<number | null>;
  updateAuthorCounterNumber(counterNumber: number): Promise<void>;
  getBookCounterNumber(): Promise<number | null>;
  updateBookCounterNumber(counterNumber: number): Promise<void>;
}
