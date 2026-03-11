export class AuthorCode {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static readonly pattern = /^AT\d{6}$/;

  private static isValid(code: string): boolean {
    return this.pattern.test(code);
  }

  static toCode(counter: number): string {
    if (!Number.isInteger(counter) || counter < 0) {
      throw new Error("Counter must be a non-negative integer");
    }
    if (counter > 999999) {
      throw new Error("Counter must not exceed 6 digits (maximum: 999999)");
    }
    return `AT${counter.toString().padStart(6, "0")}`;
  }

  static create(counter: number): AuthorCode;
  static create(code: string): AuthorCode;
  static create(input: number | string): AuthorCode {
    let code: string | undefined;
    if (typeof input === 'number') {
      code = this.toCode(input);
    } 
    code = code ?? (input as string);

    if (!this.isValid(code)) {
      throw new Error('Invalid author code format');
    }
    
    return new AuthorCode(code);
  }

  get value(): string {
    return this._value;
  }
}
