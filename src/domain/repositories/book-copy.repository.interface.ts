import { BookCopy } from "@domain/entities/book-copy.entity";
import { BookCopyStatus } from "@domain/value-object/book-copy-status.vo";

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
  updateStatus(id: number, status: BookCopyStatus): Promise<void>;
}
