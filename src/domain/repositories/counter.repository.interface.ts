export interface ICounterRepository {
  getAuthorCounterNumber(): Promise<number | null>;
  getBookCounterNumber(): Promise<number | null>;
  getPublisherCounterNumber(): Promise<number | null>;
  updateAuthorCounterNumber(counterNumber: number): Promise<void>;
  updateBookCounterNumber(counterNumber: number): Promise<void>;
  updatePublisherCounterNumber(counterNumber: number): Promise<void>;
}
