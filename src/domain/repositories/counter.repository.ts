export interface ICounterRepository {
  getPublisherCounterNumber(): Promise<number | null>;
  updatePublisherCounterNumber(counterNumber: number): Promise<void>;
}
