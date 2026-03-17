import { Publisher } from "@domain/entities/publisher.entity";

export interface PublisherSummary {
  code: string;
  name: string;
}

export const PublisherSummaryMapper = {
  toSummary: (publisher: Publisher): PublisherSummary => {
    return {
      code: publisher.code.value,
      name: publisher.name.value,
    };
  },
  toSummaryList: (publishers: Publisher[]): PublisherSummary[] => {
    return publishers.map((publisher) =>
      PublisherSummaryMapper.toSummary(publisher),
    );
  },
};
