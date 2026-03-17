import {
  AuthorSummary,
  AuthorSummaryMapper,
} from "@application/summary/author.summary";
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

  async execute(code: string): Promise<AuthorSummary> {
    this.logger.info(this.loggerContext, "start");

    const author = await this.authorRepository.findByCode(
      AuthorCode.create(code),
    );
    if (author === null) {
      throw this.exception.notFoundException({ message: "Author not found" });
    }

    this.logger.info(this.loggerContext, "end");
    return AuthorSummaryMapper.toSummary(author);
  }
}
