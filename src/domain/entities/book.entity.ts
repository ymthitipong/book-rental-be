import { Author } from "./author.entity";
import { Publisher } from "./publisher.entity";

interface BookProps {
  author: Author;
  call_number: string;
  category: string;
  code: string;
  description?: string | null;
  publicationDate?: Date | null;
  publisher?: Publisher | null;
  title: string;
}

export class Book {
  private readonly _author: Author;
  private readonly _call_number: string;
  private readonly _category: string;
  private readonly _code: string;
  private readonly _description: string | null;
  private readonly _publicationDate: Date | null;
  private readonly _publisher: Publisher | null;
  private readonly _title: string;

  private constructor(props: BookProps) {
    this._author = props.author;
    this._call_number = props.call_number;
    this._category = props.category;
    this._code = props.code;
    this._description = props.description || null;
    this._publicationDate = props.publicationDate || null;
    this._publisher = props.publisher || null;
    this._title = props.title;
  }

  static create(props: BookProps): Book {
    if (!this.validateCode(props.code)) {
      throw new Error(
        "Invalid book code. Format must be BK followed by 8 digits (e.g., BK00000001)",
      );
    }

    return new Book(props);
  }

  get callNumber(): string {
    return this._call_number;
  }

  get author(): Author {
    return this._author;
  }

  get category(): string {
    return this._category;
  }

  get code(): string {
    return this._code;
  }

  get description(): string | null {
    return this._description;
  }

  get publicationDate(): Date | null {
    return this._publicationDate;
  }

  get publisher(): Publisher | null {
    return this._publisher;
  }

  get title(): string {
    return this._title;
  }

  private static codePattern = /^BK\d{6}$/;

  private static validateCode(code: string): boolean {
    if (Book.codePattern.test(code)) {
      return true;
    }
    return false;
  }

  static toCode(counter: number): string {
    if (!Number.isInteger(counter) && counter > -1) {
      throw new Error("Counter must be an non-negative integer");
    }
    if (counter < 0) {
      throw new Error("Counter must be non-negative");
    }
    if (counter > 999999) {
      throw new Error("Counter must not exceed 6 digits (maximum: 999999)");
    }

    const bookCode = `BK${counter.toString().padStart(6, "0")}`;
    if (!this.validateCode(bookCode)) {
      throw new Error(
        "Invalid book code. Format must be BK followed by 8 digits (e.g., BK00000001)",
      );
    }

    return bookCode;
  }
}
