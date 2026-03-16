import { BookSummary, BookSummaryWithCopies } from '@application/summary/book.summary';
import { IAuthorResponse, toAuthorResponse } from './author.response.dto';
import { ICopyResponse, toCopyResponse } from './copy.response.dto';
import { IPublisherResponse, toPublisherResponse } from './publisher.response.dto';

export interface IBookResponse {
  object: 'book';
  availableCopyCount: number;
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
  totalCopyCount: number;
  copies?: ICopyResponse[];
}

export const toBookResponse = (book: BookSummary): IBookResponse => {
  return {
    object: 'book',
    availableCopyCount: book.availableCopyCount,
    authors: book.authors.map((author) => toAuthorResponse(author)),
    category: {
      code: book.category.code,
      description: book.category.description,
    },
    code: book.code,
    description: book.description,
    publicationDate: book.publicationDate,
    publisher: book.publisher
      ? toPublisherResponse(book.publisher)
      : null,
    title: book.title,
    totalCopyCount: book.totalCopyCount,
  };
}

export const toBookResponseWithCopies = (book: BookSummaryWithCopies): IBookResponse => {
  return {
    ...toBookResponse(book),
    copies: book.copies.map((copy) => toCopyResponse(copy)),
  };
}