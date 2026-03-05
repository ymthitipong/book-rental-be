import { Book } from "@domain/entities/book.entity";

enum BookCopyStatusEnum {
  AVAILABLE = "AVAILABLE",
  BORROWED = "BORROWED",
  MAINTENANCE = "MAINTENANCE",
}

interface BookCopyProps {
  acquisitionDate: string;
  book: Book;
  code: number;
  status: BookCopyStatusEnum;
}

export class BookCopy {
  private readonly _book: Book;
  private readonly _acquisitionDate: string;
  private readonly _copy_no: number;
  private readonly _status: BookCopyStatusEnum;

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

  get status(): string {
    return this._status;
  }
}
