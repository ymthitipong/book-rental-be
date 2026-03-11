import { Author } from "@domain/entities/author.entity";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IAuthorRepository } from "@domain/repositories/author.repository.interface";
import type { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { AuthorCode } from "@domain/value-object/author-code";
import { AuthorName } from "@domain/value-object/author-name";

export class CreateAuthorUseCase {
  private readonly loggerContext = "CreateAuthorUseCaseExecute";

  constructor(
    private readonly counterRepository: ICounterRepository,
    private readonly authorRepository: IAuthorRepository,

    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(name: string, yearOfBirth: number): Promise<Author> {
    this.logger.info(this.loggerContext, "start");

    const counter = await this.counterRepository.getAuthorCounterNumber();
    if (counter === null) {
      this.logger.error(this.loggerContext, "Failed to get author counter number");
      throw this.exception.internalServerErrorException({
        message: "Failed to get author counter number",
      });
    }

    const author = Author.create({
      code: AuthorCode.create(counter),
      name: AuthorName.create(name),
      yearOfBirth,
    });
    try {
      await this.authorRepository.save(author);
    } catch (error: unknown) {
      console.log('error code', (error as any).detail);
      console.log('error message', (error as any).message);
      console.log(JSON.stringify(error as object));
      this.logger.error(this.loggerContext, "Failed to save to db");
      throw this.exception.internalServerErrorException({
        detail: (error as any).detail,
        message: "Failed to save to db",
      });
    }

    await this.counterRepository.updateAuthorCounterNumber(counter + 1);

    return author;
  }
}
