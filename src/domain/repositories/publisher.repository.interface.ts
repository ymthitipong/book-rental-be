import { Publisher } from '@domain/entities/publisher.entity';

export interface IPublisherRepository {
  findAllByPartialName(name: string): Promise<Publisher[]>;
  findByCode(coded: string): Promise<Publisher | null>;
  save(publisher: Publisher): Promise<Publisher>;
}
