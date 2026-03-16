import { Book } from "@domain/entities/book.entity";
import { BookCopyStatus } from "@domain/value-object/book-copy-status.vo";

interface BookCopyProps {
  acquisitionDate: string;
  book: Book;
  no: number;
  status: BookCopyStatus;
}

export class BookCopy {
  private readonly _book: Book;
  private readonly _acquisitionDate: string;
  private readonly _no: number;
  private _status: BookCopyStatus;

  private constructor(props: BookCopyProps) {
    this._book = props.book;
    this._acquisitionDate = props.acquisitionDate;
    this._no = props.no;
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
    return `${this.book.code}-${this._no}`;
  }

  get copyNumber(): number {
    return this._no;
  }

  get status(): BookCopyStatus {
    return this._status;
  }

  borrow() {
    this._status = BookCopyStatus.borrow(this._status);
  }

  return() {
    this._status = BookCopyStatus.return(this._status);
  }
  
  repair() {
    this._status = BookCopyStatus.repair(this._status);
  }
  
  restore() {
    this._status = BookCopyStatus.restore(this._status);
  }
}
