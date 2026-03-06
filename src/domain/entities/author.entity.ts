import dayjs from "dayjs";

interface AuthorProps {
  code: string;
  name: string;
  yearOfBirth: number;
  persistenceId?: number;
}

export class Author {
  private readonly _code: string;
  private readonly _name: string;
  private readonly _yearOfBirth: number;
  private readonly _persistenceId: number | null;

  protected constructor(props: AuthorProps) {
    this._code = props.code;
    this._name = props.name;
    this._yearOfBirth = props.yearOfBirth;
    this._persistenceId = props.persistenceId ?? null;
  }

  static create(props: AuthorProps): Author {
    if (!this.validateCode(props.code)) {
      throw new Error(
        "Unable to create - Invalid author code. Format must be AT followed by 8 digits (e.g., AT00000001)",
      );
    }

    if (!this.validateYearOfBirth(props.yearOfBirth)) {
      throw new Error("Unable to create - Invalid author year of birth.");
    }

    return new Author({
      ...props,
      name: this.normalizeName(props.name),
    });
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get yearOfBirth(): number {
    return this._yearOfBirth;
  }

  get persistenceId(): number | null {
    return this._persistenceId;
  }

  private static codePattern = /^AT\d{6}$/;

  private static validateCode(code: string): boolean {
    if (Author.codePattern.test(code)) {
      return true;
    }
    return false;
  }

  private static validateYearOfBirth(yearOfBirth: number): boolean {
    if (yearOfBirth > 0 && yearOfBirth <= dayjs().year()) {
      return true;
    }
    return false;
  } 

  private static normalizeName(name: string): string {
    return name.toUpperCase();
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
        "Unable to transform - Invalid author code. Format must be AT followed by 6 digits (e.g., AT000001)",
      );
    }

    return authorCode;
  }
}
