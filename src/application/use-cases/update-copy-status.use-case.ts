import { BookCopySummaryMapper, BookCopySummaryWithBook } from "@application/summary/book-copy.summary";
import type { IException } from "@domain/exception.interface";
import type { ILogger } from "@domain/logger.interface";
import type { IBookCopyRepository } from "@domain/repositories/book-copy.repository.interface";
import type { IBookRepository } from "@domain/repositories/book.repository.interface";
import { BookCode } from "@domain/value-object/book-code";
import { BookCopyCode } from "@domain/value-object/book-copy-code";

export class UpdateCopyStatusUseCase {
  private readonly loggerContext = "UpdateCopyStatusUseCaseExecute";

  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly bookCopyRepository: IBookCopyRepository,
    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async execute(code: string, method: 'restore' | 'repair'): Promise<BookCopySummaryWithBook> {
    this.logger.info(this.loggerContext, "start");

    const verificationResult = BookCopyCode.verify(code);
    if (!verificationResult.result) {
      throw this.exception.badRequestException({ message: "invalid copy code" });
    }

    const { bookCode, copyNo } = verificationResult;
    const book = await this.bookRepository.findByCode(BookCode.create(bookCode));
    if (book === null) {
      throw this.exception.notFoundException({ message: "book not found" });
    }

    const copy = await this.bookCopyRepository.findByBookIdAndNo(book!.persistenceId!, copyNo);
    if (copy === null) {
      throw this.exception.notFoundException({ message: "copy not found" });
    }

    try {
      switch(method){
      case 'restore':
        copy.restore();
        break;
      case 'repair':
        copy.repair();
        break;
    }
    } catch (error) {
      throw this.exception.badRequestException({ message: `method ${method} conflict` });
    }
    
    await this.bookCopyRepository.updateStatus(copy.persistenceId!, copy.status);
    
    this.logger.info(this.loggerContext, "end");

    return BookCopySummaryMapper.toSummaryWithBook(copy, book!);
  }
}
