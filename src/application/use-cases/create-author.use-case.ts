import { Author } from "@domain/entities/author.entity";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IAuthorRepository } from "@domain/repositories/author.repository";
import type { ICounterRepository } from "@domain/repositories/counter.repository";

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

    const existingAuthor = await this.authorRepository.findByNameAndYearOfBirth(name.toUpperCase(), yearOfBirth);
    if (existingAuthor) {
      this.logger.warn(this.loggerContext, "Author name and year of birth already exists");
      throw this.exception.notFoundException({
        message: "Author name and year of birth already exists",
      });
    }

    const counter = await this.counterRepository.getAuthorCounterNumber();
    if (!counter) {
      this.logger.error(this.loggerContext, "Failed to get author counter number");
      throw this.exception.internalServerErrorException({
        message: "Failed to get author counter number",
      });
    }

    const author = Author.create({
      code: Author.toCode(counter),
      name,
      yearOfBirth,
    });

    await this.authorRepository.save(author);
    await this.counterRepository.updateAuthorCounterNumber(counter + 1);

    return author;
  }
}
