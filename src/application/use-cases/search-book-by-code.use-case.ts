import {
  BookSummaryMapper,
  BookSummaryWithCopies
} from "@application/summary/book.summary";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IBookCopyRepository } from "@domain/repositories/book-copy.repository.interface";
import type { IBookRepository } from "@domain/repositories/book.repository.interface";
import { BookCode } from "@domain/value-object/book-code";

export class SearchBookByCodeUseCase {
  private readonly loggerContext = "SearchBookByCodeUseCaseExecute";

  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly bookCopyRepository: IBookCopyRepository,
    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(code: string, withCopies: boolean = false): Promise<BookSummaryWithCopies> {
    this.logger.info(this.loggerContext, "start");

    const book = await this.bookRepository.findByCode(BookCode.create(code));
    if (book === null) {
      throw this.exception.notFoundException({ message: "book not found" });
    }

    if (withCopies) {
      const copies = await this.bookCopyRepository.findAllByBookId(book!.persistenceId!);
      book!.addCopies(copies);
    }

    this.logger.info(this.loggerContext, "end");
    return BookSummaryMapper.toSummaryWithCopies(book);
  }
}
