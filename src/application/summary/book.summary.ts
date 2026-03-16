import { Book } from "@domain/entities/book.entity";
import { AuthorSummary, AuthorSummaryMapper } from "./author.summary";
import { BookCopySummary, BookCopySummaryMapper } from "./book-copy.summary";
import { PublisherSummary } from "./publisher.summary";

export interface BookSummary {
  availableCopyCount: number;
  authors: AuthorSummary[];
  category: {
    code: string;
    description: string;
  };
  code: string;
  description: string | null;
  publicationDate: string | null;
  publisher: PublisherSummary | null;
  title: string;
  totalCopyCount: number;
}

export interface BookSummaryWithCopies extends BookSummary { 
  copies: BookCopySummary[] 
};

export const BookSummaryMapper = {
  toSummary: (book: Book): BookSummary => {
    return {  
      availableCopyCount: book.availableCopyCount,
      authors: book.authors.map((author) => AuthorSummaryMapper.toSummary(author)),
      category: {
        code: book.category.code,
        description: book.category.description,
      },
      code: book.code.value,
      description: book.description,
      publicationDate: book.publicationDate,
      publisher: book.publisher 
        ? {
          code: book.publisher.code.value,
          name: book.publisher.name.value,
        } 
        : null,
      title: book.title.value,
      totalCopyCount: book.totalCopyCount,
    };
  },

  toSummaryWithCopies: (book: Book): BookSummaryWithCopies => {
    return {
      ...BookSummaryMapper.toSummary(book),
      copies: book.copies.map((copy) => BookCopySummaryMapper.toSummary(copy)),
    }
  },
  
  toListSummary: (books: Book[]): BookSummary[] => {
    return books.map((book) => BookSummaryMapper.toSummary(book));
  },
  
  toListSummaryWithCopies: (books: Book[]): BookSummaryWithCopies[] => {
    return books.map((book) => BookSummaryMapper.toSummaryWithCopies(book));
  },
};

