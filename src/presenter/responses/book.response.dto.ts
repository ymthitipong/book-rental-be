import { Book } from '@domain/entities/book.entity';
import { IAuthorResponse, toAuthorResponse } from './author.response.dto';
import { IPublisherResponse, toPublisherResponse } from './publisher.response.dto';

export interface IBookResponse {
  object: 'book';
  authors: IAuthorResponse[];
  category: {
    code: string;
    description: string;
  };
  code: string;
  description: string | null;
  publicationDate: string | null;
  publisher: IPublisherResponse | null;
  title: string;
}

export const toBookResponse = (book: Book): IBookResponse => {
  return {
    object: 'book',
    authors: book.authors.map((author) => toAuthorResponse(author)),
    category: {
      code: book.category.code,
      description: book.category.description,
    },
    code: book.code.value,
    description: book.description,
    publicationDate: book.publicationDate,
    publisher: book.publisher
      ? toPublisherResponse(book.publisher)
      : null,
    title: book.title.value,
  };
}