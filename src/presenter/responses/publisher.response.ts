import { Publisher } from '@domain/entities/publisher.entity';

export interface IPublisherResponse {
  object: 'publisher';
  code: string;
  name: string;
}

export const toPublisherResponse = (publisher: Publisher): IPublisherResponse => {
  return {
    object: 'publisher',
    code: publisher.code.value,
    name: publisher.name.value,
  };
};