import { Book } from '@domain/entities/book.entity';

export interface IBookRepository {
  findByCode(name: string): Promise<Book | null>;
  save(publisher: Book): Promise<Book>;
}
