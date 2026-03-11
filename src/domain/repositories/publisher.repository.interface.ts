import { Publisher } from '@domain/entities/publisher.entity';
import { PublisherCode } from '@domain/value-object/publisher-code';
import { PublisherName } from '@domain/value-object/publisher-name';

export interface IPublisherRepository {
  findAllByPartialName(name: PublisherName): Promise<Publisher[]>;
  findByCode(code: PublisherCode): Promise<Publisher | null>;
  save(publisher: Publisher): Promise<Publisher>;
}
