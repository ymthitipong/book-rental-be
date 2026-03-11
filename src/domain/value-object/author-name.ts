export class AuthorName {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static create(name: string) {
    return new AuthorName(name.toUpperCase());
  }

  get value(): string {
    return this._value;
  }
}