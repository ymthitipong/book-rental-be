import { BookCopy } from "@domain/entities/book-copy.entity";

type RelationOptions = {
  [key in "book"]: boolean;
};

export interface IBookCopyRepository {
  findAllByBookId(bookId: number): Promise<BookCopy[]>;
  findByBookIdAndNo(bookId: number, no: number): Promise<BookCopy | null>;
  findById(
    id: number,
    options?: {
      relations?: RelationOptions;
    },
  ): Promise<BookCopy | null>;
  saveAllWithBookId(bookCopies: BookCopy[], bookId: number): Promise<void>;
}
