export class PublisherCode {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static readonly pattern = /^PB\d{6}$/;

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
    return `PB${counter.toString().padStart(6, "0")}`;
  }

  static create(counter: number): PublisherCode;
  static create(code: string): PublisherCode;
  static create(input: number | string): PublisherCode {
    let code: string | undefined;
    if (typeof input === 'number') {
      code = this.toCode(input);
    } 
    code = code ?? (input as string);

    if (!this.isValid(code)) {
      throw new Error('Invalid publisher code format');
    }
    
    return new PublisherCode(code);
  }

  get value(): string {
    return this._value;
  }
}