import { BookCopySummary, BookCopySummaryWithBook } from '@application/summary/book-copy.summary';
import { BookCopyStatusEnum } from '@domain/constant/book-copy-status.constant';
import { IBookResponse, toBookResponse } from './book.response.dto';

export interface ICopyResponse {
  object: 'copy';
  book?: IBookResponse;
  code: string;
  no: number;
  status: {
    code: BookCopyStatusEnum;
    description: string;
  };
}

export const toCopyResponse = (copy: BookCopySummary): ICopyResponse => {
  return {
    object: 'copy',
    code: copy.code,
    no: copy.no,
    status: {
      code: copy.status.value,
      description: copy.status.description,
    },
  };
}

export const toCopyResponseWithBook = (copy: BookCopySummaryWithBook): ICopyResponse => {
  return {
    ...toCopyResponse(copy),
    book: toBookResponse(copy.book),
  };
}