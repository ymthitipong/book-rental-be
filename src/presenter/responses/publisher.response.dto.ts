import { PublisherSummary } from '@application/summary/publisher.summary';

export interface IPublisherResponse {
  object: 'publisher';
  code: string;
  name: string;
}

export const toPublisherResponse = (publisher: PublisherSummary): IPublisherResponse => {
  return {
    object: 'publisher',
    code: publisher.code,
    name: publisher.name,
  };
};