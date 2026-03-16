import {
  BookCopySummary,
  BookCopySummaryMapper,
} from "@application/summary/book-copy.summary";
import {
  BookSummary,
  BookSummaryMapper,
} from "@application/summary/book.summary";
import type { ILogger } from "@domain/logger.interface";
import { IBookCopyRepository } from "@domain/repositories/book-copy.repository.interface";
import { IBookRepository } from "@domain/repositories/book.repository.interface";
import { BookCode } from "@domain/value-object/book-code";

export class CreateCopiesByBookUseCase {
  private readonly loggerContext = "CreateCopiesByBookUseCase";

  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly bookCopyRepository: IBookCopyRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(
    bookCode: string,
    copyCount: number,
  ): Promise<{
    book: BookSummary;
    newCopies: BookCopySummary[];
  }> {
    this.logger.info(this.loggerContext, "start");

    const book = await this.bookRepository.findByCode(
      BookCode.create(bookCode),
      { relations: { copies: false } },
    );

    console.log(book);

    if (!book) {
      throw new Error("Book not found");
    }

    const { newCopies, newLastCopyNo } = book.createNewCopies(copyCount);
    await this.bookCopyRepository.saveAllWithBookId(
      newCopies,
      book.persistenceId!,
    );

    const newAvailableCopyCount = book.availableCopyCount + copyCount;
    const newTotalCopyCount = book.totalCopyCount + copyCount;
    
    await this.bookRepository.updateById(book.persistenceId!, {
      availableCopyCount: newAvailableCopyCount,
      lastCopyNo: newLastCopyNo,
      totalCopyCount: newTotalCopyCount,
    });

    book.update({
      availableCopyCount: newAvailableCopyCount,
      lastCopyNo: newLastCopyNo,
      totalCopyCount: newTotalCopyCount,
    });

    return {
      book: BookSummaryMapper.toSummary(book),
      newCopies: newCopies.map((copy) => BookCopySummaryMapper.toSummary(copy)),
    };
  }
}
