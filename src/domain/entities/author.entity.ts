interface AuthorProps {
  code: string;
  fullName: string;
  sortName: string;
  yearOfBirth: string;
}

export class Author {
  private readonly _code: string;
  private readonly _fullName: string;
  private readonly _sortName: string;
  private readonly _yearOfBirth: string;

  protected constructor(props: AuthorProps) {
    this._code = props.code;
    this._fullName = props.fullName;
    this._sortName = props.sortName;
    this._yearOfBirth = props.yearOfBirth;
  }

  static create(props: AuthorProps): Author {
    if (!this.validateCode(props.code)) {
      throw new Error(
        "Invalid author code. Format must be AT followed by 8 digits (e.g., AT00000001)",
      );
    }

    return new Author(props);
  }

  get code(): string {
    return this._code;
  }

  get fullName(): string {
    return this._fullName;
  }

  get sortName(): string {
    return this._sortName;
  }

  get yearOfBirth(): string {
    return this._yearOfBirth;
  }

  private static codePattern = /^AT\d{6}$/;

  private static validateCode(code: string): boolean {
    if (Author.codePattern.test(code)) {
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

    const authorCode = `AT${counter.toString().padStart(6, "0")}`;
    if (!this.validateCode(authorCode)) {
      throw new Error(
        "Invalid author code. Format must be AT followed by 6 digits (e.g., AT000001)",
      );
    }

    return authorCode;
  }
}
