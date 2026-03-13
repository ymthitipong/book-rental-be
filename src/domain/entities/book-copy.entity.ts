import { Book } from "@domain/entities/book.entity";

import { BookCopyStatus } from "@domain/constant/book-copy-status.constant";

interface BookCopyProps {
  acquisitionDate: string;
  book: Book;
  code: number;
  status: BookCopyStatus;
}

export class BookCopy {
  private readonly _book: Book;
  private readonly _acquisitionDate: string;
  private readonly _copy_no: number;
  private readonly _status: BookCopyStatus;

  private constructor(props: BookCopyProps) {
    this._book = props.book;
    this._acquisitionDate = props.acquisitionDate;
    this._copy_no = props.code;
    this._status = props.status;
  }

  static create(props: BookCopyProps): BookCopy {
    return new BookCopy(props);
  }

  get acquisitionDate(): string {
    return this._acquisitionDate;
  }

  get book(): Book {
    return this._book;
  }

  get copyCode(): string {
    return `${this.book.code}-${this.copyNo}`;
  }

  get copyNo(): number {
    return this._copy_no;
  }

  get status(): BookCopyStatus {
    return this._status;
  }
}
