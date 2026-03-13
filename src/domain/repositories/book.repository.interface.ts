import { Book } from '@domain/entities/book.entity';
import { BookCode } from '@domain/value-object/book-code';

export interface IBookRepository {
  findByCode(name: BookCode): Promise<Book | null>;
  findById(id: number): Promise<Book | null>
  save(publisher: Book): Promise<Book>;
}
