import { Publisher } from "@domain/entities/publisher.entity";
import type { ILogger } from "@domain/logger.interface";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";
import { PublisherName } from "@domain/value-object/publisher-name";

export class SearchPublishersByPartialNameUseCase {
  private readonly loggerContext = "SearchPublishersByPartialNameUseCase";

  constructor(
    private readonly publisherRepository: IPublisherRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(name: string): Promise<Publisher[]> {
    this.logger.info(this.loggerContext, "start");
    
    const publishers = await this.publisherRepository.findAllByPartialName(PublisherName.create(name));
    
    this.logger.info(this.loggerContext, "end");
    return publishers;
  }
}
