import { BookCopy } from "@domain/entities/book-copy.entity";

type RelationOptions = {
  [key in "book"]: boolean;
};

export interface IBookCopyRepository {
  findByBookId(bookId: number): Promise<BookCopy[]>;
  findById(
    id: number,
    options?: {
      relations?: RelationOptions;
    },
  ): Promise<BookCopy | null>;
  saveAllWithBookId(bookCopies: BookCopy[], bookId: number): Promise<void>;
}
