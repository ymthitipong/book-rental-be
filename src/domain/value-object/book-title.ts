export class BookTitle {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static create(title: string) {
    return new BookTitle(title.toUpperCase());
  }

  get value(): string {
    return this._value;
  }
}