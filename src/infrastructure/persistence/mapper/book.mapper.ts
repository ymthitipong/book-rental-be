import { Book } from '@domain/entities/book.entity';
import { BookCode } from '@domain/value-object/book-code';
import { BookTitle } from '@domain/value-object/book-title';
import { BookTypeormEntity } from '@infrastructure/config/typeorm/entities/book.entity';
import { AuthorMapper, AuthorPersistence } from './author.mapper';
import { PublisherMapper, PublisherPersistence } from './publisher.mapper';

export class BookMapper {
  static toDomain(typeorm: BookTypeormEntity): Book {
    return Book.create({
      authors: typeorm.authors ? typeorm.authors.map((typeormAuthor) => AuthorMapper.toDomain(typeormAuthor)) : [],
      category: typeorm.category,
      code: BookCode.create(typeorm.code),
      description: typeorm.description,
      publicationDate: typeorm.publisherDate,
      publisher: typeorm.publisher ? PublisherMapper.toDomain(typeorm.publisher) : null,
      title: BookTitle.create(typeorm.title),
    });
  }

  static toPersistence(book: Book): Omit<
    BookTypeormEntity,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'authors' | 'publisher' | 'copies'
  > & {
    id: number | null;
    authors: AuthorPersistence[];
    publisher: PublisherPersistence | null;
  } {
    return {
      id: book.persistenceId ?? null, 
      authors: book.authors.map((author) => AuthorMapper.toPersistence(author)),
      category: book.category,
      code: book.code.value,
      description: book.description,
      publisherDate: book.publicationDate,
      publisher: book.publisher ? PublisherMapper.toPersistence(book.publisher) : null,
      title: book.title.value,
    };
  }
}
