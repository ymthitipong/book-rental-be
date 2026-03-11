import { Publisher } from "@domain/entities/publisher.entity";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";
import { PublisherCode } from "@domain/value-object/publisher-code";
import { PublisherName } from "@domain/value-object/publisher-name";

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

    const counter = await this.counterRepository.getPublisherCounterNumber();
    if (counter === null) {
      this.logger.error(this.loggerContext, "Failed to get publisher counter number");
      throw this.exception.internalServerErrorException({
        message: "Failed to get publisher counter number",
      });
    }

    const publisher = Publisher.create({
      code: PublisherCode.create(counter),
      name: PublisherName.create(name),
    });

    try {
      await this.publisherRepository.save(publisher);
    } catch (error: unknown) {
      console.log('error code', (error as any).code);
      console.log('error message', (error as any).message);
      this.logger.error(this.loggerContext, "Failed to save to db");
      throw this.exception.internalServerErrorException({
        message: "Failed to save to db",
      });
    }

    await this.counterRepository.updatePublisherCounterNumber(counter + 1);

    return publisher;
  }
}
