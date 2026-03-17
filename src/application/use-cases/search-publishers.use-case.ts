import {
  PublisherSummary,
  PublisherSummaryMapper,
} from "@application/summary/publisher.summary";
import type { ILogger } from "@domain/logger.interface";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";
import { RepositoryOrderSelectionType } from "@domain/repositories/repository.interface";
import { PublisherName } from "@domain/value-object/publisher-name";

interface ISearchPublishersData {
  name: string;
}

interface ISearchPublishersOptions {
  limit: number;
  order: string;
}

export class SearchPublishersUseCase {
  private readonly loggerContext = "SearchPublishersUseCase";

  constructor(
    private readonly publisherRepository: IPublisherRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(
    data: ISearchPublishersData,
    options: ISearchPublishersOptions,
  ): Promise<PublisherSummary[]> {
    this.logger.info(this.loggerContext, "start");

    const findAllProps = {name: data.name ? PublisherName.create(data.name) : undefined,};
    const findAllOptions = {
      limit: options.limit,
      order: toPublisherRepositoryOrder(options.order),
    };

    const publishers = await this.publisherRepository.findAll(
      findAllProps,
      findAllOptions,
    );

    this.logger.info(this.loggerContext, "end");
    return PublisherSummaryMapper.toSummaryList(publishers);
  }
}

const toPublisherRepositoryOrder = (
  usecaseOrder: string,
): { ["name"]: RepositoryOrderSelectionType } => {
  switch (usecaseOrder) {
    case "name_desc":
      return { name: "desc" };
    default:
      return { name: "asc" };
  }
};
