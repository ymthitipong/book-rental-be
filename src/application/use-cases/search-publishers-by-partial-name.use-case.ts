import { Publisher } from "@domain/entities/publisher.entity";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";

export class SearchPublishersByPartialNameUseCase {
  private readonly loggerContext = "SearchPublishersByPartialNameUseCase";

  constructor(
    private readonly publisherRepository: IPublisherRepository,

    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(name: string): Promise<Publisher[]> {
    this.logger.info(this.loggerContext, "start");
    
    const publishers = await this.publisherRepository.findAllByPartialName(name.toUpperCase());
    if (publishers.length === 0) {
      throw this.exception.notFoundException({
        message: "publishers not found",
      });
    }
    
    this.logger.info(this.loggerContext, "end");
    return publishers;
  }
}
