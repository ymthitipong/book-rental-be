import { BookCopyStatusEnum } from '@domain/constant/book-copy-status.constant';
import { BookCopy } from '@domain/entities/book-copy.entity';
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

export const toCopyResponse = (copy: BookCopy, withBook: boolean = false): ICopyResponse => {
  return {
    object: 'copy',
    book: withBook
      ? toBookResponse(copy.book)
      : undefined,
    code: copy.code,
    no: copy.number,
    status: {
      code: copy.status.value,
      description: copy.status.description,
    },
  };
}