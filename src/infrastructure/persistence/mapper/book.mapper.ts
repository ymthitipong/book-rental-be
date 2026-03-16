import { BookCategoryEnum } from '@domain/constant/book-category.constant';
import { Book } from '@domain/entities/book.entity';
import { BookCategory } from '@domain/value-object/book-category';
import { BookCode } from '@domain/value-object/book-code';
import { BookTitle } from '@domain/value-object/book-title';
import { BookTypeormEntity } from '@infrastructure/config/typeorm/entities/book.entity';
import { parseEnum } from 'src/common/utils/parse-enum.util';
import { AuthorMapper } from './author.mapper';
import { BookCopyMapper } from './book-copy.mapper';
import { PublisherMapper } from './publisher.mapper';

export class BookMapper {
  static toDomain(typeorm: BookTypeormEntity): Book {
    return Book.create({
      availableCopyCount: typeorm.availableCopyCount,
      authors: typeorm.authors 
        ? typeorm.authors.map((typeormAuthor) => AuthorMapper.toDomain(typeormAuthor)) 
        : [],
      category: BookCategory.create(parseEnum(BookCategoryEnum, typeorm.category)),
      code: BookCode.create(typeorm.code),
      copies: typeorm.copies
        ? typeorm.copies.map((typeormCopy) => BookCopyMapper.toDomain(typeormCopy)) 
        : [],
      description: typeorm.description,
      publicationDate: typeorm.publicationDate,
      publisher: typeorm.publisher 
        ? PublisherMapper.toDomain(typeorm.publisher) 
        : null,
      title: BookTitle.create(typeorm.title),
      totalCopyCount: typeorm.totalCopyCount,
    });
  }
}
