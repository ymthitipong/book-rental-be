import { Book } from '@domain/entities/book.entity';
import { BookCode } from '@domain/value-object/book-code';
import { BookTitle } from '@domain/value-object/book-title';
import { BookTypeormEntity } from '@infrastructure/config/typeorm/entities/book.entity';
import { parseEnum } from 'src/common/utils/parse-enum.util';
import { AuthorMapper } from './author.mapper';
import { PublisherMapper } from './publisher.mapper';
import { BookCategoryEnum } from '@domain/constant/book-category.constant';
import { BookCategory } from '@domain/value-object/book-category';

export class BookMapper {
  static toDomain(typeorm: BookTypeormEntity): Book {
    return Book.create({
      authors: typeorm.authors 
        ? typeorm.authors.map((typeormAuthor) => AuthorMapper.toDomain(typeormAuthor)) 
        : [],
      category: BookCategory.create(parseEnum(BookCategoryEnum, typeorm.category)),
      code: BookCode.create(typeorm.code),
      description: typeorm.description,
      publicationDate: typeorm.publicationDate,
      publisher: typeorm.publisher 
        ? PublisherMapper.toDomain(typeorm.publisher) 
        : null,
      title: BookTitle.create(typeorm.title),
    });
  }
}
