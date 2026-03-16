import { Book } from '@domain/entities/book.entity';
import { AuthorName } from '@domain/value-object/author-name';
import { BookCode } from '@domain/value-object/book-code';
import { BookTitle } from '@domain/value-object/book-title';
import { RepositoryOrderSelectionType } from './repository.interface';

type RelationOptions = {
  [key in 'copies']: boolean;
};

type OrderOptions = {
  [key in 'title']: RepositoryOrderSelectionType;
};

export interface IBookRepository {
  findAll(
    props: {
      title?: BookTitle;
      authorName?: AuthorName;
    },
    options: {
      limit?: number;
      order?: OrderOptions;
      relations?: RelationOptions;
    },
  ): Promise<Book[]>;
  findByCode(
    code: BookCode,
    options?: {
      relations?: RelationOptions;
    }
  ): Promise<Book | null>;
  findById(
    id: number,
    options?: {
      relations?: RelationOptions;
    }
  ): Promise<Book | null>;
  save(
    book: Book,
    options?: {
      relations?: RelationOptions;
    }
  ): Promise<Book>;
}
