import { BookCategory } from "@domain/value-object/book-category";
import { BookCode } from "@domain/value-object/book-code";
import { BookTitle } from "@domain/value-object/book-title";
import { Author } from "./author.entity";
import { BookCopy } from "./book-copy.entity";
import { Publisher } from "./publisher.entity";

interface BookProps {
  availableCopyCount: number;
  authors: Author[];
  category: BookCategory;
  code: BookCode; 
  copies: BookCopy[];
  description?: string | null;
  persistenceId?: number | null;
  publicationDate?: string | null;
  publisher?: Publisher | null;
  title: BookTitle;
  totalCopyCount: number;
}

export class Book {
  private _availableCopyCount: number;
  private readonly _authors: Author[];
  private readonly _category: BookCategory;
  private readonly _code: BookCode;
  private readonly _copies: BookCopy[];
  private readonly _description: string | null;
  private readonly _publicationDate: string | null;
  private readonly _publisher: Publisher | null;
  private readonly _title: BookTitle;
  private _totalCopyCount: number;
  private _persistenceId: number | null;

  private constructor(props: BookProps) {
    this._availableCopyCount = props.availableCopyCount;
    this._authors = props.authors;
    this._category = props.category;
    this._code = props.code;
    this._copies = props.copies || [];
    this._description = props.description || null;
    this._persistenceId = props.persistenceId || null;
    this._publicationDate = props.publicationDate || null;
    this._publisher = props.publisher || null;
    this._title = props.title;
    this._totalCopyCount = props.totalCopyCount;
    }

  static create(props: BookProps): Book {
    return new Book(props);
  }

  get availableCopyCount(): number {
    return this._availableCopyCount;
  }

  get authors(): Author[] {
    return this._authors;
  }

  get category(): BookCategory {
    return this._category;
  }

  get code(): BookCode {
    return this._code;
  }

  get copies(): BookCopy[] {
    return this._copies;
  }

  get description(): string | null {
    return this._description;
  }

  get persistenceId(): number | null {
    return this._persistenceId;
  }

  get publicationDate(): string | null {
    return this._publicationDate;
  }

  get publisher(): Publisher | null {
    return this._publisher;
  }

  get title(): BookTitle {
    return this._title;
  }

  get totalCopyCount(): number {
    return this._totalCopyCount;
  }

  updateAvailableCopyCount(availableCopyCount: number) {
    this._availableCopyCount = availableCopyCount;
  }

  updatePersistenceId(persistenceId: number) {
    this._persistenceId = persistenceId;
  }

  updateTotalCopyCount(totalCopyCount: number) {
    this._totalCopyCount = totalCopyCount;
  }
}
