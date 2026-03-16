import { PublisherSummary, PublisherSummaryMapper } from "@application/summary/publisher.summary";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";
import { PublisherCode } from "@domain/value-object/publisher-code";

export class SearchPublisherByCodeUseCase {
  private readonly loggerContext = "SearchAuthorByCodeUseCaseExecute";

  constructor(
    private readonly publisherRepository: IPublisherRepository,

    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(code: string): Promise<PublisherSummary> {
    this.logger.info(this.loggerContext, "start");
    
    const publisher = await this.publisherRepository.findByCode(PublisherCode.create(code));
    if (publisher === null) {
      throw this.exception.notFoundException({
        message: "publisher not found",
      });
    }
    
    this.logger.info(this.loggerContext, "end");
    return PublisherSummaryMapper.toSummary(publisher);
  }
}
