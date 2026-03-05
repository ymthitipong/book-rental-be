import { Publisher } from "@domain/entities/publisher.entity";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { ICounterRepository } from "@domain/repositories/counter.repository";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository";

export class CreatePublisherUseCase {
  private readonly loggerContext = "CreatePublisherUseCaseExecute";

  constructor(
    private readonly counterRepository: ICounterRepository,
    private readonly publisherRepository: IPublisherRepository,

    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(name: string): Promise<Publisher> {
    this.logger.info(this.loggerContext, "start");

    const existingPublisher = await this.publisherRepository.findByName(name.toUpperCase());
    if (existingPublisher) {
      this.logger.warn(this.loggerContext, "Publisher name already exists");
      throw this.exception.notFoundException({
        message: "Publisher name already exists",
      });
    }

    const counter = await this.counterRepository.getPublisherCounterNumber();
    if (!counter) {
      this.logger.error(this.loggerContext, "Failed to get publisher counter number");
      throw this.exception.internalServerErrorException({
        message: "Failed to get publisher counter number",
      });
    }

    const publisher = Publisher.create({
      code: Publisher.toCode(counter),
      name,
    });

    await this.publisherRepository.save(publisher);
    await this.counterRepository.updatePublisherCounterNumber(counter + 1);

    return publisher;
  }
}
