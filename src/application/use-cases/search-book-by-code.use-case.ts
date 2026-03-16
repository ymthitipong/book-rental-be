import {
  BookSummary,
  BookSummaryMapper,
} from "@application/summary/book.summary";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IBookRepository } from "@domain/repositories/book.repository.interface";
import { BookCode } from "@domain/value-object/book-code";

export class SearchBookByCodeUseCase {
  private readonly loggerContext = "SearchBookByCodeUseCaseExecute";

  constructor(
    private readonly bookRepository: IBookRepository,

    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(code: string): Promise<BookSummary> {
    this.logger.info(this.loggerContext, "start");

    const book = await this.bookRepository.findByCode(BookCode.create(code));
    console.log(this.loggerContext, "book", book);
    if (book === null) {
      throw this.exception.notFoundException({ message: "book not found" });
    }

    this.logger.info(this.loggerContext, "end");
    return BookSummaryMapper.toSummary(book);
  }
}
