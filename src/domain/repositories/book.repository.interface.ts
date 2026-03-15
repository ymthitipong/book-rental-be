import { Book } from '@domain/entities/book.entity';
import { AuthorName } from '@domain/value-object/author-name';
import { BookCode } from '@domain/value-object/book-code';
import { BookTitle } from '@domain/value-object/book-title';
import { RepositoryOrderSelectionType } from './repository.interface';

export interface IBookRepository {
  findAll(
    props: {
      title?: BookTitle;
      authorName?: AuthorName;
    },
    options: {
      limit?: number;
      order?: {
        [key in 'title']: RepositoryOrderSelectionType;
      };
    },
  ): Promise<Book[]>;
  findByCode(name: BookCode): Promise<Book | null>;
  findById(id: number): Promise<Book | null>;
  save(publisher: Book): Promise<Book>;
}
