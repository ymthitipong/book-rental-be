import { BookCode } from "@domain/value-object/book-code";
import { BookCopyStatus } from "@domain/value-object/book-copy-status.vo";

interface BookCopyProps {
  bookCode: BookCode;
  no: number;
  persistenceId?: number | null;
  status: BookCopyStatus;
}

export class BookCopy {
  private readonly _bookCode: BookCode;
  private readonly _no: number;
  private _status: BookCopyStatus;
  private _persistenceId: number | null;

  private constructor(props: BookCopyProps) {
    this._bookCode = props.bookCode;
    this._no = props.no;
    this._status = props.status;
    this._persistenceId = props.persistenceId ?? null;
  }

  static create(props: BookCopyProps): BookCopy {
    return new BookCopy(props);
  }

  get bookCode(): BookCode {
    return this._bookCode;
  }

  get code(): string {
    return `${this._bookCode.value}-${this._no}`;
  }

  get number(): number {
    return this._no;
  }

  get status(): BookCopyStatus {
    return this._status;
  }

  get persistenceId(): number | null {
    return this._persistenceId;
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
