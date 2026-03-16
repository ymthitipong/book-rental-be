import { BookCopy } from '@domain/entities/book-copy.entity';

type RelationOptions = {
  [key in 'book']: boolean;
};

export interface IBookCopyRepository {
  findById(
    id: number,
    options?: {
      relations?: RelationOptions;
    }
  ): Promise<BookCopy | null>;
  saveAll(bookCopies: BookCopy[]): Promise<BookCopy[]>;
}
