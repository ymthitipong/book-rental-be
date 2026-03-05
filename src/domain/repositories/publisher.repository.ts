import { Publisher } from '@domain/entities/publisher.entity';

export interface IPublisherRepository {
  findByName(name: string): Promise<Publisher | null>;
  save(publisher: Publisher): Promise<Publisher>;
}
