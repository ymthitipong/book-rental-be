import { Author } from "@domain/entities/author.entity";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IAuthorRepository } from "@domain/repositories/author.repository.interface";
import { AuthorCode } from "@domain/value-object/author-code";

export class SearchAuthorByCodeUseCase {
  private readonly loggerContext = "SearchAuthorByCodeUseCaseExecute";

  constructor(
    private readonly authorRepository: IAuthorRepository,

    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(code: string): Promise<Author> {
    this.logger.info(this.loggerContext, "start");
    
    const author = await this.authorRepository.findByCode(AuthorCode.create(code));
    if (author === null) {
      throw this.exception.notFoundException({
        message: "Author not found",
      });
    }
    
    this.logger.info(this.loggerContext, "end");
    return author;
  }
}
