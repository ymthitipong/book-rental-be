import { AuthorCode } from "@domain/value-object/author-code";
import { AuthorName } from "@domain/value-object/author-name";

interface AuthorProps {
  code: AuthorCode;
  name: AuthorName;
  yearOfBirth: number;
  persistenceId?: number;
}

export class Author {
  private readonly _code: AuthorCode;
  private readonly _name: AuthorName;
  private readonly _yearOfBirth: number;
  private readonly _persistenceId: number | null;

  protected constructor(props: AuthorProps) {
    this._code = props.code;
    this._name = props.name;
    this._yearOfBirth = props.yearOfBirth;
    this._persistenceId = props.persistenceId ?? null;
  }

  static create(props: AuthorProps): Author {
    return new Author(props);
  }

  get code(): AuthorCode {
    return this._code;
  }

  get name(): AuthorName {
    return this._name;
  }

  get yearOfBirth(): number {
    return this._yearOfBirth;
  }

  get persistenceId(): number | null {
    return this._persistenceId;
  }
}
