import { BookCategory } from "@domain/value-object/book-category";
import { BookCode } from "@domain/value-object/book-code";
import { BookTitle } from "@domain/value-object/book-title";
import { Author } from "./author.entity";
import { Publisher } from "./publisher.entity";

interface BookProps {
  authors: Author[];
  category: BookCategory;
  code: BookCode; 
  description?: string | null;
  persistenceId?: number | null;
  publicationDate?: string | null;
  publisher?: Publisher | null;
  title: BookTitle;
}

export class Book {
  private readonly _authors: Author[];
  private readonly _category: BookCategory;
  private readonly _code: BookCode; 
  private readonly _description: string | null;
  private readonly _publicationDate: string | null;
  private readonly _publisher: Publisher | null;
  private readonly _title: BookTitle;

  private _persistenceId: number | null;

  private constructor(props: BookProps) {
    this._authors = props.authors;
    this._category = props.category;
    this._code = props.code;
    this._description = props.description || null;
    this._persistenceId = props.persistenceId || null;
    this._publicationDate = props.publicationDate || null;
    this._publisher = props.publisher || null;
    this._title = props.title;
  }

  static create(props: BookProps): Book {
    return new Book(props);
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

  protected updatePersistenceId(persistenceId: number) {
    this._persistenceId = persistenceId;
  }
}
