import { BookCopyStatusEnum } from "@domain/constant/book-copy-status.constant";
import { BookCopy } from "@domain/entities/book-copy.entity";
import { Book } from "@domain/entities/book.entity";
import { BookSummary, BookSummaryMapper } from "./book.summary";

export interface BookCopySummary {
  code: string;
  no: number;
  status: {
    value: BookCopyStatusEnum;
    description: string;
  };
}

export interface BookCopySummaryWithBook extends BookCopySummary {
  book: BookSummary;
}

export const BookCopySummaryMapper = {
  toSummary: (bookCopy: BookCopy): BookCopySummary => {
    return {
      code: bookCopy.code,
      no: bookCopy.number,
      status: {
        description: bookCopy.status.description,
        value: bookCopy.status.value,
      },
    };
  },
  toSummaryWithBook: (
    bookCopy: BookCopy,
    book: Book,
  ): BookCopySummaryWithBook => {
    return {
      ...BookCopySummaryMapper.toSummary(bookCopy),
      book: BookSummaryMapper.toSummary(book),
    };
  },
};
