export class BookCode {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static readonly pattern = /^BK\d{6}$/;

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
    return `BK${counter.toString().padStart(6, "0")}`;
  }

  static create(counter: number): BookCode;
  static create(code: string): BookCode;
  static create(input: number | string): BookCode {
    let code: string | undefined;
    if (typeof input === 'number') {
      code = this.toCode(input);
    } 
    code = code ?? (input as string);

    if (!this.isValid(code)) {
      throw new Error('Invalid book code format');
    }
    
    return new BookCode(code);
  }

  get value(): string {
    return this._value;
  }
}